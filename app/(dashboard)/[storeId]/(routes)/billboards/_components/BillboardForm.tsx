type Props = {
};

export const BillboardForm: React.FC<Props> = ({ initialData }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
    </>
  );
};
