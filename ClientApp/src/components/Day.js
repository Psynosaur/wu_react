import React, {useEffect, useRef, useState} from 'react';
import {ForeCastComponent} from "./ForeCastComponent";
function CurrentConditions(props) {
    let latest = props.props;
    return (
        <>
            <div className="column is-2" id="first">
                <div className="card has-text-light">
                    <div className="card-content">
                        <div className="media">
                            <div className="media-content">
                                <ul className="content">
                                    <p className="subtitle has-text-light is-4">Outdoor</p>
                                    <li className="list-group-item">Temp<span
                                        style={{float: "right"}}>{latest.to} °C</span>
                                    </li>
                                    <li className="list-group-item">Temp Min<span
                                        style={{float: "right"}}>{latest.tmn} °C</span>
                                    </li>
                                    <li className="list-group-item">Temp Max<span
                                        style={{float: "right"}}>{latest.tmx} °C</span>
                                    </li>
                                    <li className="list-group-item">R.H.<span
                                        style={{float: "right"}}>{latest.ho}%</span></li>
                                    <li className="list-group-item">Dew Point<span
                                        style={{float: "right"}}>{latest.dc} °C</span>
                                    </li>
                                    <p className="subtitle has-text-light is-4">Wind</p>
                                    <li className="list-group-item">Direction<span
                                        style={{float: "right"}}>{latest.wd}° / {latest.wde}</span>
                                    </li>
                                    <li className="list-group-item">Direction Avg<span
                                        style={{float: "right"}}>{latest.wda}° / {latest.wdae}</span>
                                    </li>
                                    <li className="list-group-item">Chill
                                        <span style={{float: "right"}}>{latest.wc} °C</span>
                                    </li>
                                    {/*@if (windObj.currWind == 0 && windObj.currWAvg == 0 && windObj.currGust == 0)*/}
                                    {/*{*/}

                                    {/*}*/}
                                    {/*else*/}
                                    {/*{*/}
                                    {/*    <p className="subtitle has-text-light is-4">Speed</p>*/}
                                    {/*    <li class="list-group-item">Current<span style="float:right;">@(windObj.currWind > 0 ? windObj.currWind.ToString("0.00") : "0") km/h</span></li>*/}
                                    {/*    <li class="list-group-item">Average<span style="float:right;">@(windObj.currWAvg > 0 ? windObj.currWAvg.ToString("0.00") : "0") km/h</span></li>*/}
                                    {/*    <li class="list-group-item">Gust<span style="float:right;">@(windObj.currGust > 0 ? windObj.currGust.ToString("0.00") : "0") km/h</span></li>*/}
                                    {/*}*/}

                                    {/*@if (duration.Seconds > 0 && cnt < 5050 && cnt > 210)*/}
                                    {/*{*/}
                                    {/*    <p className="subtitle has-text-light is-4">Sunlight</p>*/}
                                    {/*    <li class="list-group-item">Rise<span style="float:right;">@sunrise.ToLocalTime().ToString("HH:mm")</span></li>*/}
                                    {/*    @if (isSet)*/}
                                    {/*{*/}
                                    {/*    <li class="list-group-item">Set<span style="float:right;">@sunset.ToLocalTime().ToString("HH:mm")</span></li>*/}
                                    {/*}*/}
                                    {/*    <li class="list-group-item">Total hours<span style="float:right;">@duration.ToString("g")</span></li>*/}
                                    {/*    <li class="list-group-item">Max Solar Elevation<span style="float:right;">@finalEle°</span></li>*/}
                                    {/*}*/}
                                </ul>
                                {/*@if (Model.Any(obs => obs.WindSpeedCur > 0))*/}
                                {/*{*/}
                                {/*    <div className="media">*/}
                                {/*        <div className="media-content">*/}

                                {/*            <p className="subtitle has-text-light is-4 has-tooltip-arrow"*/}
                                {/*               data-tooltip="Summary of wind intensity and its direction">Wind*/}
                                {/*                Rose</p>*/}
                                {/*            <ul className="list-group list-group-flush" id="windrose">*/}
                                {/*            </ul>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*}*/}
                                {/*else*/}
                                {/*{*/}
                                {/*    <div id="windrose" hidden></div>*/}
                                {/*}*/}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>);
}

async function getWeatherData() {
    const response = await fetch('observations/day');
    return await response.json();
}

async function getForecastData() {
    const response = await fetch('forecast');
    return await response.json();
}


Day.propTypes = {};



export function Day() {

    const latest = useRef();
    const [observations, setObservations] = useState({observations: [], loading: true});
    const [forecast, setForecast] = useState({forecasts: [], loading: true})


    useEffect(() => {

        getForecastData().then(res => {
            setForecast({forecasts: res, loading: false});
        })
        getWeatherData().then(res => {

            // GoChartsGo(res, 1);
            setObservations({observations: res, loading: false});
            latest.current = res[res.length - 1];
        });
    }, []);

    console.log(`Forecast ${forecast.loading}`);
    console.log(`Observations ${observations.loading}`);
    console.dir(`Latest ${latest.current}`)
    return (
        <>
            <section className="hero is-fullheight-with-navbar is-fullwidth">
                <div className="hero-body is-paddingless">
                    <div className="container is-fluid is-0-mobile">
                        <h1>
                            Durbanville
                        </h1>
                        {!forecast.loading &&
                            <ForeCastComponent forecast={forecast?.forecasts}/>
                        }

                        {/*{observations.loading === false ??*/}
                        {/*    <>*/}
                        {/*        <div className={"columns has-text-light"}>*/}
                        {/*            <div className={"column has-text-light"}> {latest.ot}*/}
                        {/*                <br/>*/}
                        {/*                <input id="time" className="flatpickr flatpickr-input active" type="text"*/}
                        {/*                       placeholder={latest.ot} data-id="multipleCustomConjunction"/>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*        <div className="columns is-12-mobile">*/}
                        {/*            <CurrentConditions props={latest}/>*/}
                        {/*            <div className="column is-8" id="middle">*/}
                        {/*                <div className="columns">*/}
                        {/*                    <div className="column is-half" id={"chartemp"}*/}
                        {/*                         style={{height: "300px"}}></div>*/}
                        {/*                    <div className="column is-half" id={"chartminmax"}*/}
                        {/*                         style={{height: "300px"}}></div>*/}
                        {/*                </div>*/}
                        {/*                <div className="columns">*/}
                        {/*                    <div className="column is-half" id={"charthum"}*/}
                        {/*                         style={{height: "300px"}}></div>*/}
                        {/*                    <div className="column is-half" id={"chartpressure"}*/}
                        {/*                         style={{height: "300px"}}></div>*/}
                        {/*                </div>*/}
                        {/*                <div className="columns">*/}
                        {/*                    <div className="column is-half" id={"chartwind"}*/}
                        {/*                         style={{height: "300px"}}></div>*/}
                        {/*                    <div className="column is-half" id={"chartrain"}*/}
                        {/*                         style={{height: "300px"}}></div>*/}
                        {/*                </div>*/}
                        {/*                <div className="columns">*/}
                        {/*                    <div className="column is-half" id={"chartsolar"}*/}
                        {/*                         style={{height: "300px"}}></div>*/}
                        {/*                    <div className="column is-half" id={"chartuv"}*/}
                        {/*                         style={{height: "300px"}}></div>*/}
                        {/*                </div>*/}
                        {/*                <div className="columns">*/}
                        {/*                    <div className="column is-full" id={"chartwd"}*/}
                        {/*                         style={{height: "300px"}}></div>*/}
                        {/*                </div>*/}
                        {/*                <div className="columns" id="roses">*/}
                        {/*                    <div className="column is-6" id={"chartTR"}*/}
                        {/*                         style={{height: '400px', width: '50vw'}}></div>*/}
                        {/*                    /!*<div className="column is-3" id="chartPR" style="height:400px;width: 400px"></div>*!/*/}
                        {/*                    <div className="column is-6" id={"chartHR"}*/}
                        {/*                         style={{height: '400px', width: '50vw'}}></div>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </>*/}
                        {/*}*/}
                    </div>
                </div>
            </section>
        </>
    );
}


export default Day;