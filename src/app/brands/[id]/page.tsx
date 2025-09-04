import React from "react";
import BrandProducts from "@/app/_components/shared/brandProducts";

interface Props {
  params: {
    id: string;
  };
}

async function Page(props: Props) {
  const { params } = props;
  const id = await params.id;

  return <BrandProducts brandId={id} />;
}

export default Page;
