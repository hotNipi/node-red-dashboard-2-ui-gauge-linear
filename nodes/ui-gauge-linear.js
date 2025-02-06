module.exports = function (RED) {
    function UIGaugeLinearNode (config) {
        RED.nodes.createNode(this, config)
        const node = this
        const dynamicProps = ["min","max","unit","label","class","icon","ticks","colors","zeroCrossColors"]

        // which group are we rendering this widget
        const group = RED.nodes.getNode(config.group)

        const base = group.getBase()

        // initialise data store on startup or deploy
        base.stores.data.save(base, node, {})

        // server-side event handlers
        const evts = {
            onAction: true,
            beforeSend: function (msg) {
                const updates = msg.ui_update
                if (updates) {
                    Object.keys(updates).forEach(k => {
                        if(dynamicProps.includes(k)){                           
                            if(k == "colors" && Array.isArray(updates[k])){
                                updates[k].forEach((c,i) => {
                                    if(typeof c == "string"){
                                        updates[k][i] = {color:c}
                                    }
                                })  
                                base.stores.state.set(group.getBase(), node, msg, k, updates[k])        
                            }
                            
                            else if(k == "min"){
                                if(updates[k].value != undefined){
                                    base.stores.state.set(group.getBase(), node, msg, k, updates[k].value) 
                                }
                                if(updates[k].label != undefined){
                                    base.stores.state.set(group.getBase(), node, msg, "minLabel", updates[k].label) 
                                }

                            }
                            else if(k == "max"){
                                if(updates[k].value != undefined){
                                    base.stores.state.set(group.getBase(), node, msg, k, updates[k].value) 
                                }
                                if(updates[k].label != undefined){
                                    base.stores.state.set(group.getBase(), node, msg, "maxLabel", updates[k].label) 
                                }
                            }
                            else{
                                base.stores.state.set(group.getBase(), node, msg, k, updates[k]) 
                            }                            
                            
                            //console.log("updating",k,'to',updates[k])
                        }
                    })                   
                }
                return msg
            },
            onInput: function (msg, send, done) { 
                let val = RED.util.getMessageProperty(msg, config.property)                         
                if (typeof val != "undefined") {                   
                    msg.payload = val                    
                }
                console.log("storing",msg)               
                base.stores.data.save(base, node, msg)
                send(msg)
            },

            onSocket: {
                connect: function (socket) {
                    // Send the configuration values to the client-side widget
                    socket.emit('widget-config:' + node.id, config);
                }
            }
        }

        if (group) {
            group.register(node, config, evts)
        } else {
            node.error('No group configured')
        }
    }

    RED.nodes.registerType('ui-gauge-linear', UIGaugeLinearNode)
}
