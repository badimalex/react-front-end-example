DOM = React.DOM;

const posts = [
  {
    "image": {
      "src": "https://facebook.github.io/react/img/logo.svg",
      "width": 36,
      "height": 36,
    },
    "text": "Post 1"
  },
  {
    "image": {
      "src": "https://facebook.github.io/react/img/logo.svg",
      "width": 36,
      "height": 36,
    },
    "text": "Post 2"
  },
  {
    "image": {
      "src": "https://facebook.github.io/react/img/logo.svg",
      "width": 36,
      "height": 36,
    },
    "text": "Post 3"
  }
];

// Image component
const Image = ({src, width, height, alt}) => (
  React.createElement(
    "img", { src, width, height, alt }
  )
);

// textBox component
const TextBox = ({text}) => (
  DOM.span(null, `${text}`)
);

// BlogItem component
class BlogItem extends React.Component {
   render() {
    return (
      React.createElement(
        "div",
        { className: 'blog-item' },
        React.createElement(
          Image,
          this.props.image
        ),
        React.createElement(
          TextBox, { text: this.props.text }
        )
      )
    );
  }
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

ReactDOM.render(
  React.createElement(BlogPage),
  document.getElementById('app')
);


