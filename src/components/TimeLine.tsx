import useTimeLine from '../hooks/useTimeLine';

type TTimeLine = {
    fontSize: number;
    scrollWidth: number;
};

const TimeLine = ({ fontSize, scrollWidth }: TTimeLine) => {
    const { ref } = useTimeLine(fontSize, scrollWidth);

    return (
        <div className="TimeLine" ref={ref}>
            <div className="TimeLine__timeline" style={{ left: 0 }}></div>
        </div>
    );
};

export default TimeLine;
