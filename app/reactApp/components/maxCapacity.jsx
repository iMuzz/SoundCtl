import React from         'react'

export class MaxCapacity extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("PROFILE: ", this.props.profile);
    let name = this.props.profile.name.split(' ')[0];
    return  ( 
      <div className='container max-capacity-wrap'>
        <div className='max-container'>
          Hang tight {name}! Our private beta is currently full.
          We'll send you an email once we're ready to accept 
          more people into our beta program!
        </div>
      </div>
    );
  }
}