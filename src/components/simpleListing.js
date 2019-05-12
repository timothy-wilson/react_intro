import React from 'react';

export class SimpleListing extends React.Component {
    render() {
        return (
            <div>
                <h4>{this.props.title}</h4>
                <ul>
                  {
                    this.props.listing.map((listItemText) => {
                      return <li key={listItemText}>{listItemText}</li>
                    })
                  }
                </ul>
            </div>
        );
    }
}