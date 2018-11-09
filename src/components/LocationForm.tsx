import * as React from 'react';
import './LocationForm.css';

export interface IProps {
    onLocationChange: (location: string) => void;
}

export class LocationForm extends React.Component<IProps, any> {

    constructor(props: IProps) {
        super(props);
        this.state = { location: '' };

        this.locationChanged = this.locationChanged.bind(this);
        this.locationSubmitted = this.locationSubmitted.bind(this);
    }

    public render() {
        return (
            <form onSubmit={this.locationSubmitted}>
                <input
                    className="location-input"
                    type="text"
                    name="location"
                    placeholder="Please enter a location"
                    value={this.state.location}
                    onChange={this.locationChanged}
                />
                <button className="submit" type="submit">Submit</button>
            </form>
        )
    }

    private locationChanged(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ location: event.target.value });
    }

    private locationSubmitted(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        this.props.onLocationChange(this.state.location);
    }
}
