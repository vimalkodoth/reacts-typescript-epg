import useTimeLine from '../hooks/useTimeLine';

type TTimeLine = {
    fontSize: number;
    scrollWidth: number;
};

const TimeLine = ({ fontSize, scrollWidth }: TTimeLine) => {
    const { ref, ems } = useTimeLine(fontSize, scrollWidth);

    return (
        <div className="TimeLine" ref={ref}>
            <div
                className="TimeLine__timeline"
                style={{ left: `${ems}em` }}
            ></div>
        </div>
    );
};

export default TimeLine;
