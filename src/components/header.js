export class Header extends React.Component {
    render() {
      return (
        <div>
            <img src="./dist/assets/sw_logo.png" alt="Star Wars logo" className="star-wars-logo"></img>
            <div className="secondary-header">Character listing from the Star Wars movies</div>
        </div>
      );
    }
  }