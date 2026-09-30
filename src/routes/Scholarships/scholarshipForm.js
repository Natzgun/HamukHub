export function toFormValues(scholarship) {
  return {
    title: scholarship.title,
    description: scholarship.description,
    image: scholarship.image,
    country: scholarship.country,
    continent: scholarship.continent,
    moreInfo: scholarship.moreInfo,
    requirements: scholarship.requirements?.map(({ name }) => name).join('\n') ?? '',
  };
}

export function toScholarshipRequest(values) {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    image: values.image.trim(),
    country: values.country.trim(),
    continent: values.continent.trim(),
    moreInfo: values.moreInfo.trim(),
    requirements: [...new Set((values.requirements ?? '').split(/\r?\n/)
      .map((name) => name.trim()).filter(Boolean))].map((name) => ({ name })),
  };
}
