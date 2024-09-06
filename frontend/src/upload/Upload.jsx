import config from "../appconfig.js";
import ImageUploader from "./ImageUploader";

const Upload = () => {
  return (
    <>
      <h4>Upload</h4>
      <ImageUploader destination={config.imageServiceUrl()} />
    </>
  );
};

export default Upload;
