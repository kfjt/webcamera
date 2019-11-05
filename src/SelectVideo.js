import React, { useRef, useState, useEffect } from 'react'

const SelectVideo = props => {
  const { setDeviceId } = props
  const selectEl = useRef()
  const [items, setItems] = useState([])

  useEffect(() => {
    const { mediaDevices } = navigator
    const getDevices = async () => {
      if (mediaDevices && mediaDevices.enumerateDevices) {
        const mediaDeviceInfo = await navigator.mediaDevices.enumerateDevices()
        const videos = mediaDeviceInfo
          .filter(it => it.kind === 'videoinput')
          .map((v, i) => <option value={v.deviceId} key={i + 1}>camera {i} {v.label}</option>)
        videos.unshift(<option key='0'>select device</option>)
        setItems(videos)
      }
    }
    getDevices()
  }, [])

  return <select ref={selectEl} onChange={e => setDeviceId(e.target.value)}>{items}</select>
}

export default SelectVideo
