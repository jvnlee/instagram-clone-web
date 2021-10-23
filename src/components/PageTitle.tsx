import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
}

function PageTitle({ title }: Props) {
  return (
    <Helmet>
      <title>{title} • Instagram</title>
    </Helmet>
  );
}

export default PageTitle;
