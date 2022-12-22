import React, {useRef} from "react";
import * as moment from "moment"

/**
 * It returns a React component that displays the moon phase, the moon phase image, the moon phase age, and the moonrise
 * and moonset times
 * @param props - the props object passed to the component
 * @returns A React component that displays the moon phase, the moon phase day, the moonrise time, and the moonset time.
 */
function MoonComponent(props) {
    return <>
        <h3 className="has-text-light">{props.model.moonPhase[props.index]}</h3>
        <div className="moon" style={{textAlign: "center"}}>
            <img src={props.src} alt=""/>

        </div>

        <div id="moontext">
            <strong className="has-text-light">
                {props.model.moonPhaseDay[props.index] === 0 ? "" : props.model.moonPhaseDay[props.index]}
            </strong>
            {props.model.moonPhaseDay[props.index] > 1 &&
                <span> days old </span>
            }
            {props.model.moonPhaseDay[props.index] === 1 &&
                <span> day old </span>
            }
            {props.model.moonPhaseDay[props.index] === 0 &&
                <span>Moon</span>
            }
        </div>
        <div className="columns is-mobile">
            <div className="column is-half" id="MoonriseText">
                {props.model.moonsetTimeLocal[props.index] !== "" &&
                    <h3 className="has-tooltip-arrow has-text-grey-light"
                        data-tooltip="Moonrise time">{props.moonriseString}</h3>
                }
            </div>
            <div className="column is-half" id="MoonriseText">
                {props.model.moonsetTimeLocal[props.index] !== "" &&
                    <h3 className="has-tooltip-arrow has-text-grey-light"
                        data-tooltip="Moonset time">{props.moonsetString}</h3>
                }
            </div>
        </div>
    </>;
}

/**
 * If the relative humidity is null, then display the image, the narrative, and the cloud cover, precipitation chance, and
 * relative humidity
 * @param props - the props object passed to the component
 * @returns the following:
 */
function NightComponent(props) {
    return <>
        {props.model.daypart[0].relativeHumidity[props.index + props.index] === null &&
            <>

                <div className="image-container">
                    <img
                        src={props.src}
                        alt=""/>

                </div>
                <br/>
                <div id="narrative">
                    {props.model.daypart[0].wxPhraseLong[props.index + props.index + 1]}{", "}
                    {props.model.daypart[0].windPhrase[props.index + props.index + 1]}
                </div>
                <br/>
                <div className="columns is-mobile">
                    <div className="column is-one-third has-text-centered">
                                                    <span className="has-tooltip-arrow"
                                                          data-tooltip="Cloud cover for this period">
                                                        Clouds<br/>{props.model.daypart[0].cloudCover[props.index + props.index + 1]} %
                                                    </span>
                    </div>

                    <div className="column is-one-third has-text-centered">
                                                    <span className="has-tooltip-arrow"
                                                          data-tooltip="Precipitation chance">
                                                        Precip.<br/>{props.model.daypart[0].precipChance[props.index + props.index + 1]} %
                                                    </span>
                    </div>
                    <div className="column is-one-third has-text-centered">
                                                    <span className="has-tooltip-arrow"
                                                          data-tooltip="Relative humidity">
                                                        R.H.<br/>{props.model.daypart[0].relativeHumidity[props.index + props.index + 1]} %
                                                    </span>
                    </div>

                </div>
            </>
        }
    </>;
}

/**
 * It's a React component that renders a daypart's weather data
 * @param props - {
 * @returns A React component.
 */
function DayComponent(props) {
    return <>
        {props.model.daypart[0].relativeHumidity[props.index + props.index] > 0 &&

            <>
                {props.index > 0 &&
                    <>
                        <div className={"has-tooltip-arrow"}
                             data-tooltip={`${props.timespan.minutes() > 0 ? props.timespan.minutes() + "m and " : ""}${props.timespan.seconds()}s ${props.timespan.minutes() <= 0 && props.timespan.seconds() <= 0 ? "longer" : "shorter"} than ${props.model.dayOfWeek[props.index - 1]}`}>
                            {/*<h3 className={"subtitle has-text-light"}*/}
                            {/*    style={{textAlign: "center!important"}}>Daytime</h3>*/}

                            <div className={"image-container"}>
                                <img src={props.src} alt=""/>
                            </div>
                        </div>
                    </>
                }
                {props.index === 0 &&
                    <div className={"image-container"}>
                        <img src={props.src} alt=""/>
                    </div>
                }
                <br/>
                <div id={"narrative"}>
                    {props.model.daypart[0].wxPhraseLong[props.index + props.index]}{", "}
                    {props.model.daypart[0].windPhrase[props.index + props.index]}
                </div>
                <br/>
                <div className={"columns is-mobile"}>
                    <div className={"column is-one-third has-text-centered"}>
                        <span className={"has-tooltip-arrow"} data-tooltip={"Cloud cover for this period"}>
                            Clouds
                            <br/>
                            {props.model.daypart[0].cloudCover[props.index + props.index]} %
                        </span>
                    </div>

                    <div className={"column is-one-third has-text-centered"}>
                        <span className={"has-tooltip-arrow"} data-tooltip={"Precipitation chance"}>
                            Precip.
                            <br/>
                            {props.model.daypart[0].precipChance[props.index + props.index]} %
                        </span>
                    </div>
                    <div className={"column is-one-third has-text-centered"}>
                        <span className={"has-tooltip-arrow"} data-tooltip={"Relative humidity"}>
                            R.H.
                            <br/>
                            {props.model.daypart[0].relativeHumidity[props.index + props.index]} %
                        </span>
                    </div>
                </div>
            </>
        }
    </>;
}

/**
 * It returns a div with three columns, the first and last of which contain the sunrise and sunset times, and the middle
 * column contains the expected rainfall
 * @param props - {
 * @returns A div with three columns. The first column contains the sunrise time, the second column contains the expected
 * rainfall, and the third column contains the sunset time.
 */
function SunRainComponent(props) {
    return <div className={"columns is-mobile"}>
        <div className={"column"} id={"WeekdaySubHeadings"}>
            <h3 className={"has-tooltip-arrow has-text-warning"}
                data-tooltip={"Sunrise"}>{props.sunriseString}</h3>
        </div>

        {props.rain !== 0 &&
            <div className={"column is-paddingless"}>
                <h3 className={"has-tooltip-arrow has-text-info"}
                    data-tooltip={"Expected rainfall"}>{props.rain} mm</h3>
            </div>
        }
        {props.rain === 0 &&
            <div className={"column is-paddingless"}>
                <h3></h3>
            </div>
        }
        <div className={"column"} id={"WeekdaySubHeadings"}>
            <h3 className={"has-tooltip-arrow has-text-warning"}
                data-tooltip={"Sunset"}>{props.sunsetString}</h3>
        </div>
    </div>;
}

/**
 * It returns a React fragment containing a div with two columns, the first column containing the day of the week, and the
 * second column containing two divs, the first div containing the minimum temperature, and the second div containing the
 * maximum temperature
 * @param props - The props object is a JavaScript object that contains all the properties that are passed to the
 * component.
 * @returns A React component.
 */
function DaySummaryComponent(props) {
    return <>
        <div className={"columns is-mobile"}>
            <div className={"column"}>
                <h3 className={"is-size-5"}>{props.model.dayOfWeek[props.index]}</h3>
            </div>
        </div>
        <div className={"columns is-mobile"}>
            <div className={"column"} id="WeekdaySubHeadings">
                <h3 className={"has-tooltip-arrow has-text-link"}
                    data-tooltip="Temp min">{props.model.temperatureMin[props.index]}°C</h3>
            </div>

            <div className={"column"} id="WeekdaySubHeadings">
                {props.model.temperatureMax[props.index] === null &&
                    // After 3pm we do not get the value for TemperatureMax anymore
                    <h4 className="has-tooltip-arrow has-text-danger-dark"
                        data-tooltip="Temp max">
                        {props.model.daypart[0].temperatureHeatIndex[props.index + props.index + 1]}°C
                    </h4>
                }
                {props.model.temperatureMax[props.index] !== null &&
                    <h4 className={"has-tooltip-arrow has-text-danger-dark"}
                        data-tooltip="Temp max">{props.model.temperatureMax[props.index]}°C</h4>
                }
            </div>
        </div>
    </>;
}

/**
 * It returns a div with a class of column is-2, which contains a div with a class of box is-size-8
 * has-background-grey-darker has-text-light, which contains a DaySummaryComponent, a SunRainComponent, a DayComponent, a
 * NightComponent, and a MoonComponent
 * @param props - {
 * @returns A div with a class of column is-2.
 */
function DayReportComponent(props) {
    return <div className={"column is-2"}>
        <div className={"box is-size-8 has-background-grey-darker has-text-light"}>
            <DaySummaryComponent model={props.model} index={props.index}/>
            <SunRainComponent sunriseString={props.sunriseString} rain={props.rain}
                              sunsetString={props.sunsetString}/>

            <DayComponent model={props.model} index={props.index} timespan={props.timespan}
                          src={props.dayPath}/>
            <NightComponent model={props.model} index={props.index} src={props.nightPath}/>

            <MoonComponent model={props.model} index={props.index} src={props.moonPath}
                           moonriseString={props.moonriseString}
                           moonsetString={props.moonsetString}/>

        </div>
    </div>;
}

export function ForeCastComponent(props) {
    const model = props.forecast[0];
    let dayTimes = useRef([]);
    return (
        <>
            <div className={"container hero"}>
                <div className="columns has-text-light">
                    {
                        model.dayOfWeek.map((fc, index) => {
                            let rain = parseInt(model.qpf[index]);
                            let dayPath = `/img/Weather Icons - 200x200_SVGs/SVGs/${model.daypart[0].iconCode[index + index]}.svg`;
                            let moonPath = `/img/moon/wi-moon-alt-${model.moonPhaseDay[index] === 0 ? 29 : model.moonPhaseDay[index]}.svg`
                            let nightPath = `/img/Weather Icons - 200x200_SVGs/SVGs/${model.daypart[0].iconCode[index + index + 1]}.svg`;
                            let moonrise = moment.utc(model.moonriseTimeLocal[index]);
                            let moonriseString = moonrise.local().format("HH:mm");
                            let moonset = moment.utc(model.moonsetTimeLocal[index]);
                            let moonsetString = moonset.local().format("HH:mm");
                            let sunrise = moment.utc(model.sunriseTimeLocal[index]);
                            let sunriseString = sunrise.local().format("HH:mm");
                            let sunset = moment.utc(model.sunsetTimeLocal[index]);
                            let sunsetString = sunset.local().format("HH:mm")
                            // let span = sunset.diff(sunrise);
                            let totalMinutes = moment.duration(sunset.diff(sunrise));

                            dayTimes.current.push(totalMinutes);
                            let timespan;
                            if (index > 0) {
                                let lengthOfDay = dayTimes.current[index - 1] - dayTimes.current[index];
                                timespan = moment.duration(lengthOfDay, 'milliseconds');
                            }
                            return (
                                <React.Fragment key={index}>
                                    <DayReportComponent
                                        dayPath={dayPath}
                                        index={index}
                                        model={model}
                                        moonPath={moonPath}
                                        moonriseString={moonriseString}
                                        moonsetString={moonsetString}
                                        nightPath={nightPath}
                                        rain={rain}
                                        sunriseString={sunriseString}
                                        sunsetString={sunsetString}
                                        timespan={timespan}
                                    />
                                </React.Fragment>)
                        })
                    }
                </div>
            </div>
        </>
    );
}