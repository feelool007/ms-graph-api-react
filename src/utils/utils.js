export const replaceEventBodyContent = (
  eventBody,
  newBodyContent,
  containerSelector
) => {
  let parser = new DOMParser();
  let serializer = new XMLSerializer();

  let bodyHtml = parser.parseFromString(`${eventBody}`, "text/html");
  bodyHtml.querySelector(containerSelector).innerHTML = newBodyContent;

  return serializer.serializeToString(bodyHtml);
};
