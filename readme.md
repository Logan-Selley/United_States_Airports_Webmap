# United States Airports

## By Logan Selley

---

## Description

> A Leaflet based webmap displaying all airports in the United States, whether each airport has an air traffic control tower or not with pop-ups on each marker for the airport name, and a choropleth map of how many airports are in each state. Choropleth ranges were created using quantiles.

## Libraries

- leaflet 1.4.0
- leaflet.ajax 2.1.0
- Font-Awesome 4.7.0
- Jquery 3.1.0
- Chroma-js 1.3.4
- leaflet.markercluster 1.4.1

## Data Sources/Credit

- Basemap from CartoDB [Positron](https://carto.com/help/building-maps/basemap-list/)
- Airport Data from [catalog.data.gov](https://catalog.data.gov/dataset/usgs-small-scale-dataset-airports-of-the-united-states-201207-shapefile)
- State Boundaries and Airport counts from [Mike Bostock](http://bost.ocks.org/mike), [D3](http://d3js.org/)

## Functions

### pointToLayer

> Creates a leaflet layer of markers out of the airport vector data, assigning an id based on air traffic control status as well as assigning an icon and creating marker groups.

### onEachFeature

> Adds a popup to each marker created by the pointToLayer function displaying the airport name

### setColor

> Sets the color ramp values for the choropleth map of airport density

### style

> Sets the style for each state polygon, setting color using the setColor function

### legend.onAdd

> Manually adds the contents of the legend
