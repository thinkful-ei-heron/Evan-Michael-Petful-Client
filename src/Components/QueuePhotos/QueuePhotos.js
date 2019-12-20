import React, { Component } from 'react';
import ApiService from '../../Services/ApiService';

export default class QueuePhotos extends Component {
  
  componentDidMount() {
    ApiService.getCats()
      .then(this.context.displayPhoto)
  }

  render() {
    return (
      <section>
        <p>TEMP PHOTOS</p>
      </section>
    );
  }
}