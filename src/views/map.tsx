import React, { useState } from 'react'
import MapGL from 'react-map-gl'

// Replace this with your own Mapbox access token.
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoidmluaWNpdXNiYXN0b3MyIiwiYSI6ImNtNXphZDNtMjAwanYyeG9xZWsyODh3amgifQ.aReTXlCNe2hNtS1KlIpcfA'

function SimpleMap() {
  const [viewState, setViewState] = useState({
    longitude: -122.45,
    latitude: 37.8,
    zoom: 10,
  })

  return (
    <MapGL
      {...viewState}
      width="100%"
      height="100vh"
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      onMove={(ev) => setViewState(ev.viewState)}
      style={{ position: 'relative' }}
    />
  )
}

export default SimpleMap
