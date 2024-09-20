# A linear type of gauge node for node-red dashboard 2.0

A linear type of gauge node for the flowfuse [Node-RED](https://nodered.org) Dashboard 2.0

## Install

The usual method of installing is to use Manage Palette in the node red editor and search for @hotnipi/node-red-dashboard-2-ui-gauge-linear and install it.

Using `npm` directly, `cd` into your node red user directory (usually .node-red in your home folder) and from there run
```
npm install @hotnipi/node-red-dashboard-2-ui-gauge-linear
```

## Inputs

Pass the value in `msg.payload`.  This may be a Number or a string that represents a number.


Certain configuration values can be overridden dynamically be passing in an object in `msg.ui_update`.  See Dynamic Properties below.  

## Configuration

* **Name** - The name of the node.
* **Group** - The display group in which to show the gauge.
* **Size** - The size of the gauge on the dashboard.
* **Label** - A text label that is shown above the gauge's bar. 

* **Limits Min and Max** - These specify the range of the gauge. Values are mandatory. Optionally you can configure labels for limits. If configured, the label is shown instead of value.
* **Ticks** - This defines intermediate values under the gauge bar.  Each row defines the value of the tick and as for limits, optionally the label for tick can be configured.

* **Bar** - The bar beahvior and colors. Select the mode first and the configure the colors and maybe count of the cells. You can always change the mode but whenever you have selected a mode which makes same color for all cells, you'll need configure the colors again.
    * **Select Mode** - Select the mode of the bar beahvior. **"Default"** - basic mode. **"Full Bar Color"** - all bar cells change the color based on value. **"Cross Zero"** - The left end of the bar is zero. The right end is even positiove or negative limit. The bar switches color based of value being positive or negative. If Min and Max are configured equally far from zero, it is possible to configure intermediate ticks. Otherwise ticks are not available for this mode.  

    * **Pick Color** - Use color picker to select the color and then drag over the bar to apply the selected color to the desired cells. Repeat this step to apply different colors for different bar regions. Note that for **"Cross Zero"** mode it takes to configure different colors for positive and negative occurence. 

    * **Add cell** - Adds a cell to the bar end. (if there is less than 60)
    * **Remove cell** - Removes a cell from the bar end. (until there is only 2)


* **Icon** - An icon that is shown in front of the gauge's bar. Gauge supports Material design icons.
* **Unit** - The unit string to show in the gauge. 
* **Dim** - The value for how much non-active cells will dim down. Number in range 0.1 - 0.8 

* **Class** - A CSS Class that will be applied to the gauge to allow override of display element style.

## Dynamic Properties

Certain properties can be overridden by passing an object in `msg.ui_update`.  The name of the item in `msg.ui_update` is generally the name of the propety being overridden.  For example, the Ticks definitions may be changed by passing in array in `msg.ui_update.ticks`.  

* **Colors** - If `msg.ui_update.colors` contains an array then that will be used to override all cells.  The array must contain a list of colors:  
`["green","green","green","red"]`
Define color for each cell.  
* **Min** - If `msg.ui_update.min` is present and contains an object `{value:10}` or `{value:10,label:"Ten"}` then min limit of the gauge will be changed.
* **Max** - If `msg.ui_update.max` is present and contains an object `{value:10}` or `{value:10,label:"Ten"}` then max limit of the gauge will be changed.
* **Unit** - If `msg.ui_update.unit` is present and contains a string then that string will be displayed in the units field in the gauge.
* **Ticks** - If `msg.ui_update.ticks` contains an array then that will be used to override all ticks. The format of the tick in the array is same as for min and max. `[{value:10},{value:30}]` or `[{value:10,label:"Ten"}]`
* **ZeroCrossColors** - If `msg.ui_update.zeroCrossColors` contains an array then that will be used to override colros when gauge mode is Cross Zero. Two colors must be defined in array representing colors for negative and positive  `["red","green"]`
* **Icon** - If `msg.ui_update.icon` is present and contains a icon name as string then gauge changes the icon. Note that you can not change the icon if you didn't configure the gauge to have icon.

### CSS overrides

Display elements my be overriden in the normal way using a ui-template node.  In particular:

**The color of the value**  
```
.myclass .hotnipi-gauge-linear-value{
    color: red;
}
```

## Other notes
* **Count of cells** - The optimal count of the cells is about 20. Cell count is limited: min 2, max 60 .You are free to configure any amout of cells in this range but pay attention for 2 key things. 
    * Too many elements may affect the performance of the dashboard. 
    * The node is made responsive. If you are using it with small screen and there is not enough space to render elements, the gauge tries to hold important elements visible by removing less important elements. Every second cell is removed to keep other cells size reasonable. This also means that if you configure single cell with one color, it may be removed if conditions met.  