import { useParams } from "next/navigation";
import { ApiInfo } from "./api-info";
import { OriginUrl } from "@/hooks/use-originURL";

interface Props {
  entityName: string;
  entityIdName: string;
}
export const ApiList = (props: Props) => {
  const { entityName, entityIdName } = props;
  const { storeId } = useParams();
  const origin = OriginUrl();

  const baseUrl = `${origin}/api/${storeId}`;

  return (
    <>
      <ApiInfo
        title="GET"
        description={`${baseUrl}/${entityName}`}
        variant="public"
      />

      <ApiInfo
        title="GET"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="public"
      />

      <ApiInfo
        title="POST"
        description={`${baseUrl}/${entityName}`}
        variant="admin"
      />

      <ApiInfo
        title="PATCH"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />

      <ApiInfo
        title="DELETE"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
    </>
  );
};
