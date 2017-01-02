const { DOM, PropTypes } = React;
const { bind } = _;

const posts = [
  {
    "id":1,
    "image": {
      "src": "https://facebook.github.io/react/img/logo.svg",
      "width": 36,
      "height": 36,
    },
    "text": "Post 1"
    , "meta": {
      "author": "John"
      , "created_at": "October 13, 2014 11:13:00"
      , "updated_at": "November 13, 2014 11:13:00"
      , "likes": 1
    }
  },
  {
    "id":2,
    "image": {
      "src": "https://facebook.github.io/react/img/logo.svg",
      "width": 36,
      "height": 36,
    },
    "text": "Post 2"
    , "meta": {
      "author": "Ivan"
      , "created_at": "December 13, 2014 11:13:00"
      , "updated_at": "January 13, 2015 11:13:00"
      , "likes": 2
    }
  },
  {
    "id":3,
    "image": {
      "src": "https://facebook.github.io/react/img/logo.svg",
      "width": 36,
      "height": 36,
    },
    "text": "Post 3"
    , "meta": {
      "author": "Dima"
      , "created_at": "September 13, 2014 11:13:00"
      , "updated_at": "November 13, 2014 11:13:00"
      , "likes": 3
    }
  }
];

// Image component
const Image = ({src, width, height, alt}) => (
  React.createElement(
    "img", { src, width, height, alt }
  )
);

const ImageShape = PropTypes.shape({
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
}).isRequired;

Image.defaultProps = {
  src: 'https://vk.com/images/camera_50.png',
  width: 50,
  height: 50,
  alt: 'No avatar'
}

Image.propTypes = ImageShape;

// textBox component
const TextBox = ({text}) => (
  DOM.span(null, text)
);

TextBox.propTypes = {
  text: PropTypes.string
}

// Like component
const Like = ({likes, likeHandler}) => (
  <div>
    <span>Likes: {likes}</span>
    <button onClick={likeHandler}>+</button>
  </div>
);

Like.propTypes = {
  count: PropTypes.number
}

// BlogItem component
class BlogItem extends React.Component {
   render() {
   const { image, text, meta, likeHandler } = this.props;
    return (
      React.createElement(
        "div",
        { className: 'blog-item' },
        React.createElement(
          Image,
          image
        ),
        React.createElement(
          TextBox, { text: `${text} by ${meta.author} on ${moment(meta.created_at).format('L')}` }
        ),
        React.createElement(
          "div",
          null,
          `Updated: ${moment(meta.updated_at).format('L')}`
        ),
        React.createElement(
          Like,
          { likes: meta.likes, likeHandler: likeHandler }
        )
      )
    );
  }
}

const BlogItemShape = PropTypes.shape({
  image: ImageShape,
  text: PropTypes.string,
  meta: PropTypes.object,
}).isRequired;

BlogItem.propTypes = BlogItemShape;

// BlogList
const BlogList = ({posts, likeHandler}) => (
  React.createElement(
    "div",
    { className: 'blog-list' },
    _.map(
      posts,
      (post) => (
        <BlogItem key={post.id} {...post} likeHandler={ () => likeHandler(post.id) } />
      )
    )
  )
);

BlogList.propTypes = {
  posts: React.PropTypes.arrayOf(BlogItemShape)
}

class PieChart extends React.Component {
  componentDidMount() {
    this.chart = c3.generate({
      bindto: ReactDOM.findDOMNode(this.refs.chart),
      data: {
        columns: this.props.columns,
        type : 'pie',
      }
    })
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  componentWillReceiveProps(nextProps) {
    this.chart.load(nextProps);
  }

  render() {
    return (
      <div ref="chart" />
    );
  }
}

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts };
    this.likeHandler = bind(this.likeHandler, this);
  }

  likeHandler(id) {
    let post = _.find(posts, (o) => o.id == id );
    post.meta.likes += 1;
    this.setState({ posts: posts });
  }

  getChartData() {
    return _.map(posts, (p)=> [p.text, p.meta.likes] )
  }

  render() {
    const { posts } = this.state;
    return (
      <div className="blog-page">
        <BlogList posts={posts} likeHandler={ this.likeHandler} />
        <PieChart columns={this.getChartData()} />
      </div>
    )
  }
}

BlogPage.propTypes = {
  posts: React.PropTypes.arrayOf(BlogItemShape)
}

ReactDOM.render(
  <BlogPage />,
  document.getElementById('app')
);
