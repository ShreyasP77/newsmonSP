import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);


        this.state = {
            articles: [],
            loading: false,
            page: 1,

        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)}`;
    }

    updateNews = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={yourApiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({
            loading: true
        })

        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false

        })
    }

    async componentDidMount() {
        this.updateNews();
    }


    fetchMoreData = async () => {

        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey={yourApiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false

        })

    };

    render() {

        return (

            <div className="container my-1">

                {/* Infinite Scroll */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles !== []}
                    loader={<Spinner />}
                >
                    <div className="row my-2">

                        {this.state.articles.map((element) => {
                            return <div className='col-md-4 my-2 ' key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title.slice(0, 38) : ""}
                                    description={element.description ? element.description.slice(0, 70) : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    date={element.publishedAt}
                                    author={element.author}
                                    source={element.source.name}

                                />
                            </div>
                        })}

                    </div>
                </InfiniteScroll>
            </div>

        )
    }
}

export default News


