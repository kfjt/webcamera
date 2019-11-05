import React, { useRef, useState, useEffect } from 'react'

const SelectVideo = props => {
  const { deviceId, setDeviceId } = props
  const selectEl = useRef()
  const [items, setItems] = useState([])

  useEffect(() => {
    const option = ({ value, key, label }) => <option value={value} key={key}>camera {key}: {label}</option>
    const { mediaDevices } = navigator
    const getDevices = async () => {
      if (!mediaDevices) return
      if (!mediaDevices.enumerateDevices) return
      const mediaDeviceInfo = await mediaDevices.enumerateDevices()
      const videos = mediaDeviceInfo
        .filter(v => v.kind === 'videoinput')
        .map((v, i) => option({ value: v.deviceId, key: i + 1, label: v.label }))
      setDeviceId(videos[0].props.value)
      setItems(videos)
    }
    getDevices()
  }, [setItems, setDeviceId])

  return <select ref={selectEl} value={deviceId} onChange={e => setDeviceId(e.target.value)}>{items}</select>
}

export default SelectVideo
