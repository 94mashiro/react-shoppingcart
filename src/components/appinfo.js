import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

class AppInfo extends Component {
  static propTypes = {
    info: PropTypes.object
  }

  render() {
    return (
      <div style={{flex:'1', flexGrow:0, margin:'10px 25px', flexBasis: '100px'}}>
        <Link to={`/detail/${this.props.info.id}`}>
          <img 
            src={this.props.info.icon} 
            style={{
              marginBottom:'10px', width:'100px', height:'100px', borderRadius:'20px', boxShadow:'0 4px 3px -2px rgba(0, 0, 0, 0.8)'
            }}/>
        </Link>
        <br/>
        {this.props.info.name.split('-')[0].substr(0,10)}
        <br/>
        <b>{this.props.info.price} RMB</b>
      </div>
    );
  }
}

export default AppInfo;