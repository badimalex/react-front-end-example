const { DOM, PropTypes } = React;
const { bind } = _;

const posts = [
  {
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

Image.defaultProps = {
  src: 'https://vk.com/images/camera_50.png',
  width: 50,
  height: 50,
  alt: 'No avatar'
}

Image.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  alt: PropTypes.string,
}

// textBox component
const TextBox = ({text}) => (
  DOM.span(null, text)
);

TextBox.propTypes = {
  text: PropTypes.string
}

// Like component
class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: props.count }
    this.handleClick = bind(this.handleClick, this);
  }

  handleClick(e) {
    this.setState({count: this.state.count+1 })
  }

  render() {
    return (
      <div>
        <span>Likes: {this.state.count}</span>
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

Like.propTypes = {
  count: PropTypes.number
}

// BlogItem component
class BlogItem extends React.Component {
   render() {
   const { image, text, meta } = this.props;
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
          { count: meta.likes }
        )
      )
    );
  }
}

BlogItem.propTypes = {
  image: PropTypes.object,
  text: PropTypes.string,
  meta: PropTypes.object,
}

// BlogList
const BlogList = ({posts}) => (
  React.createElement(
    "div",
    { className: 'blog-list' },
    _.map(
      posts,
      (post, key) => (
        React.createElement( BlogItem, _.assign(post, {key}) )
      )
    )
  )
);

BlogList.propTypes = {
  posts: PropTypes.array
}

class BlogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts };
  }

  render() {
    const { posts } = this.state;
    return React.createElement(BlogList, { posts });
  }
}

BlogPage.propTypes = {
  posts: PropTypes.array
}

ReactDOM.render(
  React.createElement(BlogPage),
  document.getElementById('app')
);
