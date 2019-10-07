import React from 'react'
import Lottie from 'react-lottie';
import * as animationData from '../Resources/lf30_editor_M8dofI.json'

export default class Animation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isStopped: false, isPaused: false};
  }

  render() {

    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return (
      <div>
        <Lottie options={defaultOptions}
          height={120}
          width={120}
          isStopped={false}
          isPaused={false}
        />
      </div>
    )
  }
}