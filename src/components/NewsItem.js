import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl,author,date,source} = this.props;
    return (
      <div>
        <div className="card">
         {/* <span className="position-absolute top-0 translate-middle badge rounded-pill bg-warning" style={{left:"40px",zIndex:"1"}}
         >
  {source}
  </span> */}
          <img src={imageUrl ? imageUrl : "https://www.freeiconspng.com/uploads/camera-icon--free-all-download-22.jpg"} width='240' height = '280' className="card-img-top" alt="..." />
          <div className="card-body">

            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}..</p>
             <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()} </small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
