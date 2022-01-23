import "./App.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import React from 'react';
import { marked } from 'marked';

marked.setOptions({
  breaks: true
});

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: placeholder,
      markdown: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
    let parsed = marked.parse(event.target.value)
    this.setState({ markdown: parsed });
  }

  componentDidMount() {
    let parsed = marked.parse(placeholder)
    this.setState({ markdown: parsed });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Card bg="dark" border="light" className="Card-style">
            <Card.Header as="h5">Markdown</Card.Header>
            <Form.Control
            id="editor"
              as="textarea"
              placeholder="Write some Markdown here"
              style={{ resize: 'none', borderRadius: '0%', fontSize: '1rem', backgroundColor: '#21242b', minHeight: '75vh', color: 'white' }}
              value={this.state.text}
              onChange={this.handleChange}
            />
          </Card>
          <Card bg="dark" border="light" className="Card-style" >
            <Card.Header as="h5">Preview</Card.Header>
            <Card.Body style={{ fontSize: '1rem', margin: '0' }}>
              <div dangerouslySetInnerHTML={{ __html: this.state.markdown }} id="preview"/>
            </Card.Body>
          </Card>
        </header>
      </div>
    );
  }
}

export default App;
