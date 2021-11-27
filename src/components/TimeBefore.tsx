import styled from "styled-components";

const Time = styled.span`
  display: block;
  color: ${(props) => props.theme.fontColor};
  opacity: 0.5;
  font-size: 12px;
  margin-right: 8px;
`;

function TimeBefore(createdAt: string) {
  const diff = (Date.now() - parseInt(createdAt)) / 1000;
  if (diff < 60) {
    return <Time>{`${Math.round(diff)}s`}</Time>;
  } else if (diff >= 60 && diff < 3600) {
    return <Time>{`${Math.round(diff / 60)}m`}</Time>;
  } else if (diff >= 3600 && diff < 86400) {
    return <Time>{`${Math.round(diff / 3600)}h`}</Time>;
  } else if (diff >= 86400 && diff < 604800) {
    return <Time>{`${Math.round(diff / 86400)}d`}</Time>;
  } else {
    return <Time>{`${Math.round(diff / 604800)}w`}</Time>;
  }
}

export default TimeBefore;
