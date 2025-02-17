import React, { Component } from 'react';
import { RadioButton } from './';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPlotProps, setTrackType, setMultiLevelType } from '../redux/actions/actions';

class PlotCharacterisitics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'currentTrack': 0
        };
        this.onTrackTypeChange = this.onTrackTypeChange.bind(this);
        this.radioChange = this.radioChange.bind(this);
        this.multiRadioChange = this.multiRadioChange.bind(this);
    }


    onTrackTypeChange(event) {
        const trackId = event.target.id, { currentTrack } = this.state;
        let { trackType } = this.props;

        if (trackId == 'track-select-color') {
            trackType[currentTrack].color = event.target.value;
        }
        else {
            trackType[currentTrack].type = event.target.value;
        }
        this.props.actions.setTrackType(_.cloneDeep(trackType));
    }


    radioChange(event) {
        const value = event.target.value;
        if (value.indexOf('level') > -1) {
            this.props.actions.setPlotProps('level', value == 'level-multi');
        }
        else {
            this.props.actions.setPlotProps('type', value);
        }
    }

    multiRadioChange(event) {
        const value = event.target.value;
        this.props.actions.setMultiLevelType(value);
    }

    render() {

        const { multiLevel, multiLevelType,
            trackType, configuration, plotType } = this.props,
            { currentTrack } = this.state;

        return (
            <div className='plot-type-panel'>

                <div className='snapshot-header'>
                    <h4>Chart Configuration
                        <span className="icon icon-chevron-right"></span>
                    </h4>
                </div>

                <div className='snapshot-inner'>
                    <span className='text-primary info-text-message'> Select the type of analysis you want to do, single level analysis is for pairwise comparisions while multi level analysis is for comparing more than 2 entities at a time
                    through stacked parallel plots or hive plots.</span>
                    <RadioButton value={'level-single'} id={'level-single'} className='conf-radio' name='level-select'
                        label={"Single Level Analysis"}
                        onChange={this.radioChange}
                        checked={!multiLevel} />
                    <RadioButton value={'level-multi'} id={'level-multi'} className='conf-radio' name='level-select'
                        label={"Multi Level Analysis"}
                        onChange={this.radioChange}
                        checked={multiLevel} />
                    {!multiLevel && <div>
                        <RadioButton value={'dashboard'} id={'dashboard'} className='conf-radio' name='plot-select'
                            label={"Basic Dashboard"}
                            onChange={this.radioChange}
                            checked={plotType == 'dashboard'} />
                        <RadioButton value={'dotplot'} id={'dotplot'} className='conf-radio' name='plot-select'
                            label={"Dot Plot"}
                            onChange={this.radioChange}
                            checked={plotType == 'dotplot'} />
                        <RadioButton value={'linearplot'} id={'linearplot'} className='conf-radio' name='plot-select'
                            label={"Parallel Link PLot"}
                            onChange={this.radioChange}
                            checked={plotType == 'linearplot'} />
                    </div>}

                    {multiLevel && <div>
                        <RadioButton value={'tree'} id={'tree'} className='conf-radio' name='multi-view-select'
                            label={"Tree View"}
                            onChange={this.multiRadioChange}
                            checked={multiLevelType == 'tree'} />
                        <RadioButton value={'hive'} id={'hive'} className='conf-radio' name='multi-view-select'
                            label={"Hive View"}
                            onChange={this.multiRadioChange}
                            checked={multiLevelType == 'hive'} />
                        <RadioButton value={'cube'} id={'cube'} className='conf-radio' name='multi-view-select'
                            label={"3D Cube View"}
                            onChange={this.multiRadioChange}
                            checked={multiLevelType == 'cube'} />
                    </div>}

                    <span className='text-primary info-text-message p-b-0'>
                        If one or more track files have been provided choose one of the
                        following options to change the track type and their color scale,
                        However tracks are only shown for some plots and not all.
                    </span>
                    <div className='track-select-box'>
                        <span className='select-wrapper'>Select Track
                            <select className='form-control' value={currentTrack}
                                onChange={(e) => { this.setState({ 'currentTrack': e.target.value }) }}>
                                <option value={'0'}>Track 1</option>
                                <option value={'1'}>Track 2</option>
                                <option value={'2'}>Track 3</option>
                                <option value={'3'}>Track 4</option>
                            </select>
                        </span>
                        <span className='select-wrapper'>Track Type
                        <select className='form-control'
                                id='track-select-type'
                                onChange={this.onTrackTypeChange}
                                value={trackType[currentTrack].type}>
                                <option value='track-heatmap'>Heatmap</option>
                                <option value='track-histogram'>Histogram</option>
                                <option value='track-line'>Line Chart</option>
                                <option value='track-scatter'>Scatter Plot</option>
                            </select>
                        </span>
                        <span className='select-wrapper'>Track Color Palette
                        <select className='form-control'
                                id='track-select-color'
                                onChange={this.onTrackTypeChange}
                                value={trackType[currentTrack].color}>
                                <option value='red'>Red</option>
                                <option value='blue'>Blue</option>
                                <option value='green'>Green</option>
                                <option value='orange'>Orange</option>
                            </select>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            setPlotProps,
            setTrackType,
            setMultiLevelType
        }, dispatch)
    };
}

function mapStateToProps(state) {
    return { trackType: state.oracle.trackType };
}


export default connect(mapStateToProps, mapDispatchToProps)(PlotCharacterisitics);




