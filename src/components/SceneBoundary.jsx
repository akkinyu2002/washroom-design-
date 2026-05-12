import { Component } from 'react'

export function SceneFallback({ label = '3D preview unavailable' }) {
  return (
    <div className="scene-fallback" role="status">
      {label}
    </div>
  )
}

export default class SceneBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.error(error)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <SceneFallback />
    }

    return this.props.children
  }
}
