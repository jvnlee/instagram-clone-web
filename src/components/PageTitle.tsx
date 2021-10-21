import { Helmet } from "react-helmet-async";

interface IProps {
  title: string;
}

function PageTitle({ title }: IProps) {
  return (
    <Helmet>
      <title>{title} • Instagram</title>
    </Helmet>
  );
}

export default PageTitle;
