<template>
    <div class="hotnipi-gauge-linear" :class="class" style="--responsive-cut:icon">
        <div :class="icon ? 'hotnipi-gauge-linear-grid-2':'hotnipi-gauge-linear-grid-1'">
            <div v-if="icon" class="hotnipi-gauge-linear-icon">
                <v-icon aria-hidden="false">{{icon}}</v-icon>
            </div>
            <div class="hotnipi-gauge-linear-content">
                <div class="hotnipi-gauge-linear-text">
                    <span class="hotnipi-gauge-linear-label">{{label}}</span>
                    <span class="hotnipi-gauge-linear-value">{{formattedValue}}<span class="hotnipi-gauge-linear-unit">{{unit}}</span></span>
                </div>
                <div v-if="bar=='segmented'" class="hotnipi-gauge-linear-stripe">
                    <div v-for="(color, index) in colors" :key="index" class="hotnipi-gauge-linear-led" :ref="'dot-' + index" :style="'background-color:'+color.color+';'"></div>
                </div>
                <div v-if="bar=='solid'" class="hotnipi-gauge-linear-stripe-solid">
                    <div v-if="mode!='fullBar'" v-for="(color, index) in colors"  :key="index" :id="'bar-'+index" :style="'background-color:'+color.color+';max-width:'+color.size+'%;'" class="hotnipi-gauge-linear-bar" :ref="'bar-' + index"></div>
                    <div v-if="mode=='fullBar'" class="hotnipi-gauge-linear-bar" ref="bar"></div>
                </div>
                <div class="hotnipi-gauge-linear-limits">
                    <span class="hotnipi-gauge-linear-limit">{{labelFor(min)}}</span>
                    <span v-for="(tick, index) in ticks" :key="index" class="hotnipi-gauge-linear-limit" :ref="'tick-' + index">{{labelFor(tick)}}</span>
                    <span class="hotnipi-gauge-linear-limit">{{labelFor(max)}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'UIGaugeLinear',
    inject: ['$socket'],
    props: {
        /* do not remove entries from this - Dashboard's Layout Manager's will pass this data to your component */
        id: { type: String, required: true },
        props: { type: Object, default: () => ({}) },
        state: { type: Object, default: () => ({ enabled: false, visible: false }) }
    },
    setup (props) {
        //console.info('UIGaugeLinear setup with:', props)
        //console.debug('Vue function loaded correctly', markRaw)        
    },
    data(){
        return {                                                           
            label:"Level zero cross", 
            icon:"mdi-account",        
            min:{value:0,label:""}, 
            max:{value:100,label:""}, 
            unit:"cm³",
            dim:0.2, 
            
            animate:true, 
            
            colors:[],                
            ticks:[],
            bar:"segmented",
            mode:"default", //zeroCross , fullBar , default        
            zeroCrossColors:["#ff4c16","#00e300"],
            value:0,
            previousValue:0,
            decimals:2,
            zeros:true,
            class: "",         
            inited:false,
            
        }
    },


   
    methods: {
        applyProperties:function(){

            const props = this.props
            this.ticks = props.ticks;
            this.min = {
                value:Number(props.min),
                label:props.minLabel
            }
            this.max = {
                value:Number(props.max),
                label:props.maxLabel
            }
            this.colors = props.colors
            this.mode = props.mode
            this.bar = props.bar
            this.label = props.label
            this.unit = props.unit
            this.property = props.property ?? "payload"
            this.dim = Number(props.dim)
            this.icon = props.icon.startsWith('mdi-') ? props.icon : props.icon == "" ? "" : "mdi-"+props.icon
            this.zeroCrossColors = props.zeroCrossColors
            this.class = this.props.myclass
            this.decimals = Number(props.decimals)
            this.zeros = props.zeros

        },        
        getElement: function(name,base){        
            if(base){
                return this.$refs[name]
            }
            else{
                if(this.$refs[name] && this.$refs[name].length){
                    return this.$refs[name][0]
                }
            }
            return null            
        },
        labelFor : function(property){
            let v = ""
            if(!property.label || property.label == ""){
                v = property.value
                /* if(this.mode == "zeroCross" && this.value < 0 && property.value != 0){
                   v = property.value *-1;
                } */
                if(this.mode == "zeroCross"){
                    if(property === this.min){
                        v = "0"
                    }
                    else if(property === this.max){
                        if(this.value < 0){
                            v = this.min.value
                        }
                        else{
                            v = this.max.value
                        }
                    }
                    else{
                        v = this.value < 0 ? property.value *-1 : property.value;
                    }
                }

            }
            else{
                v = property.label
            }
            return v
        },
        validate(data){
            let ret
            if(typeof data !== "number"){
                ret = parseFloat(data)
                if(isNaN(ret)){
                    //console.log("BAD DATA! id:",this.id,"data:",data)
                    return null
                }   
            }
            else{
                ret = data
            }            
            return ret
        },

        full: function(){
            return Math.floor(this.colors.length*this.percentage/100)
        },
        half: function (){
            let p = this.colors.length*this.percentage/100;
            p -= this.full()
            p *= .5
            p += this.dim;
            return p;
        },
        segmentedFullBarColor: function(){

            let f = this.full()-1
            f = Math.min(f,this.colors.length-1)
            f = Math.max(f,0)
            return this.colors[f].color
        },
        
        tickPosition: function(tv){
            if(this.mode == "zeroCross"){
                let v = Math.abs(tv)
                let t = this.value < 0 ? Math.abs(this.min.value) : this.max.value
                return Math.floor((v / t) * 100)+'%';
            }        
            return Math.floor(((tv - this.min.value) / (this.max.value - this.min.value)) * 100)+'%';
        },
        
        arrangeTicks:function(){
            if(this.mode == "zeroCross"){
                if(this.max.value != Math.abs(this.min.value)){
                    this.ticks = []
                }
            }            
            this.ticks.forEach((t,i) => {
                let tick = this.getElement("tick-"+i);
                    if(tick){                        
                        tick.style.left = this.tickPosition(t.value)
                    }  
                }
            );
        },
        replaceColors:function(){
            if(this.bar == "segmented"){
                this.colors.forEach((c,i) => {
                let dot = this.getElement("dot-"+i);
                    if(dot){                        
                        dot.style.backgroundColor = c.color
                    }                
                }
            )}
        },        

        lit: function(){
            if(this.inited == false){
                return
            }
            if(this.bar == "solid"){               
                this.move()
                return
            }
            const down = this.previousValue > this.value
            let time = down ? 1 : 0.2
            let step = down ? 0.12 : 0.06
            let ledColor = this.mode == "fullBar" ? this.segmentedFullBarColor() : null
            if(this.mode == "zeroCross"){
                ledColor = this.value < 0 ? this.zeroCrossColors[0] : this.zeroCrossColors[1]                
            } 
            this.colors.forEach((color,i) => {
                let dot = this.getElement("dot-"+i);
                if(!dot){
                    console.log("lit() no dots found")
                    return
                }                
                if(i<this.full()){                   
                    dot.style.opacity = 1;
                    time += step
                }
                else if(i==this.full()){                    
                    dot.style.opacity = this.half()                                   
                }
                else{                  
                    dot.style.opacity = this.dim                                  
                }               
                time -= step
                if(ledColor){
                    dot.style.backgroundColor = ledColor
                }
                
                dot.style.transition = this.animate && time > 0 ? "opacity "+time+"s" : "unset";
            })
            this.previousValue = this.value
        },
        move:function(){
            let element
            if(this.mode == "fullBar"){
                element = this.getElement("bar",true);
                let pos = 0
                let last = this.ticks.findLastIndex(t => t.value < this.value)               
                if(last > -1){
                    pos = last + 1
                }
                if(pos > this.colors.length -1){
                    pos = this.colors.length -1
                }               
                       
                element.style.backgroundColor =  this.fullBarColors[pos].color
                element.style.width = this.percentage + "%"
            }
            else{
                this.colors.forEach((color,i) => {
                    element = this.getElement("bar-"+i);
                    if(!element){
                        console.log("move() no bars found")
                        return
                    }
                    element.style.width = this.percentage + "%"
                    if(this.mode == "zeroCross"){
                        element.style.backgroundColor = this.value < 0 ? this.zeroCrossColors[0] : this.zeroCrossColors[1]                
                    }
                })  
            } 
        },

        
        onPayload:function(msg) {
            if(msg?.payload != undefined){
                const v = this.validate(msg.payload)                
                if(v !== null){
                    this.value = v                
                    this.lit()
                }
            }
           
            let rearrange = false
            if (msg.ui_update?.min  &&  msg.ui_update?.min.value && typeof msg.ui_update?.min.value === 'number') {
                this.min = msg.ui_update.min
                rearrange = true
            }
            if (msg.ui_update?.max  &&  msg.ui_update?.max.value && typeof msg.ui_update?.max.value === 'number') {
                this.max = msg.ui_update.max
                rearrange = true
            }
            
            if (msg.ui_update?.unit  &&  typeof msg.ui_update.unit === 'string') {
                this.unit = msg.ui_update.unit
            }

            if (msg.ui_update?.label  &&  typeof msg.ui_update.label === 'string') {
                this.label = msg.ui_update.label
            }
            if (msg.ui_update?.class != undefined  &&  typeof msg.ui_update.class === 'string') {
                this.class = msg.ui_update.class
            }

            if (msg.ui_update?.icon  &&  typeof msg.ui_update.icon === 'string') {
                let i = msg.ui_update.icon                
                this.icon = i.startsWith('mdi-') ? i : i == "" ? "" : "mdi-"+i
            }
            if (Array.isArray(msg.ui_update?.ticks)) {
                this.ticks = msg.ui_update.ticks
                rearrange = true               
            }
            if (Array.isArray(msg.ui_update?.colors)) {
                this.colors = msg.ui_update.colors
                this.$nextTick(() => {
                    this.replaceColors()
                    this.lit()
                })               
            }            
            if (Array.isArray(msg.ui_update?.zeroCrossColors)) {
                this.zeroCrossColors = msg.ui_update.zeroCrossColors
                this.$nextTick(() => {
                    this.lit()
                })               
            }
            if(rearrange){
                this.$nextTick(() => {
                    this.arrangeTicks()
                    this.lit()
                })
            }
        }
    },
   
    computed: {
        ...mapState('data', ['messages']),
        formattedValue: function () {
            let minDigits = this.zeros == true ? this.decimals : 0
            const formatter = new Intl.NumberFormat("en", { 
                useGrouping:false,
                maximumFractionDigits: this.decimals ,
                minimumFractionDigits: minDigits}
            )

            return formatter.format(this.value)
        },
        percentage: function(){
            let v = this.value
            if(this.mode == "zeroCross"){
                v = Math.abs(this.value)
                let t = this.value < 0 ? Math.abs(this.min.value) : this.max.value
                return Math.min(Math.floor((v / t) * 100),100);
            }
            return Math.min(Math.floor(((v - this.min.value) / (this.max.value - this.min.value)) * 100),100);
        }
    },
    mounted(){               
        this.applyProperties()

        this.$socket.on('widget-load:' + this.id, (msg) => {           
            this.onPayload(msg) 
        })
        this.$socket.on('msg-input:' + this.id, (msg) => {            
            this.onPayload(msg)            
            this.$store.commit('data/bind', {
                widgetId: this.id,
                msg
            })
        })


        this.$nextTick(() => {
            if(this.mode == "zeroCross"){
                if(this.max.value != Math.abs(this.min.value)){
                    this.ticks = []
                }
            }
            let dot
            this.colors.forEach((c,i) => {
                    if(this.bar == "segmented"){
                        dot = this.getElement("dot-"+i);
                        if(!dot){                        
                            return
                        }                    
                        dot.style.backgroundColor = c.color
                    }
                    else{
                        if(this.mode != "fullBar"){                         
                           
                            dot = this.getElement("bar-"+i);
                            if(!dot){                        
                                return
                            }
                            dot.style.maxWidth = c.size+"%"                          
                           
                        }
                    }                                   
                });
            if(this.mode == "fullBar" && this.bar == "solid"){
                 this.fullBarColors = [...this.colors]
                this.fullBarColors.reverse()

            }   
            this.ticks.forEach((t,i) => {
                let tick = this.getElement("tick-"+i);
                    if(!tick){                        
                        return
                    }                                  
                    tick.style.left = this.tickPosition(t.value)
                }
            );
            this.inited = true;
            this.lit()

        })  
        this.$socket.emit('widget-load', this.id)         
    },
    unmounted () {
        this.$socket?.off('widget-load:' + this.id)
        this.$socket?.off('msg-input:' + this.id)
    }
}
</script>

<style scoped>
    @import "../stylesheets/ui-gauge-linear.css";
</style>
