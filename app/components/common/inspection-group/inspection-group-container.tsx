  const { mutate: endRegistrationMutate, isLoading: isEndRegistrationLoading } =
    useInspectionGroupsEndRegistration();
  const { mutate: inspectMutate, isLoading: isInspectLoading } =
    useInspectionGroupsInspect();

  const handleClickCreate = () => {
    createMutate(undefined, {
      onSuccess(response) {
        setInspectionGroups(response.data.inspectionGroups);
        dispatch({ type: "create" });
      },
      onError: (error: AxiosError) => {
        alert((error.response?.data as { message: string })?.message);
      },
    });
  };

  const handleClickEndRegistration = (id: number) => {
    endRegistrationMutate(
      {
        path: `inspection/inspection_groups/${id}/end_registration`,
      },
      {
        onSuccess(response) {
          alert("締め切りました");
          setInspectionGroups(response.data.inspectionGroups);
          setSelectedGroupId(undefined);
          dispatch({ type: "endRegistration" });
        },
        onError(error: AxiosError) {
          alert((error.response?.data as { message: string })?.message);
        },
      }
    );
  };

