/* eslint-disable react/prop-types */

import { downloadUploadedFiles } from '../../services/api';

/* eslint-disable no-unused-vars */
const FileDetails = ({
  fileName,
  originalFileName,
  fileVersion,
  filePath,
  typeOfFile,
  tags,
  prevVersionsDetails,
  bucketName,
  bucketId,
}) => {
  const downloadFile = async (fileName, originalFileName, typeOfFile) => {
    try {
      let body = {
        bucketName: bucketName,
        bucketId: bucketId,
        fileName: fileName,
        originalFileName: originalFileName,
      };
      let file = downloadUploadedFiles(body, typeOfFile);
      console.log("Downloading file", file)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fileDetails__Container">
      <section className="mainDetails">
        <div>
          <label className='uploadFileLabel'>File Name</label>
          <p>
            <a onClick={() => downloadFile(fileName, originalFileName, typeOfFile)}>
              {fileName}
            </a>
          </p>
        </div>
        <div>
          <label className='uploadFileLabel'>Original File Name</label>
          <p>{originalFileName}</p>
        </div>
        <div>
          <label className='uploadFileLabel'>File Version</label>
          <p>{fileVersion}</p>
        </div>
        <div>
          <label className='uploadFileLabel'>File Path</label>
          <p>{filePath}</p>
        </div>
        <div>
          <label className='uploadFileLabel'>Type of File</label>
          <p>{typeOfFile}</p>
        </div>
        <div>
          <label className='uploadFileLabel'>Tags</label>
          <p>{tags.length ? tags.toString() : '-'}</p>
        </div>
      </section>
      {prevVersionsDetails.length && <hr style={{ marginTop: '1rem' }} />}
      {prevVersionsDetails && prevVersionsDetails.length && (
        <section className="previousVersionDetails">
          Previous Versions File Details:
          {prevVersionsDetails.map((prevDetails, _id) => {
            return (
              <section
                className="mainDetails"
                key={_id}
                style={{ marginBottom: '1rem' }}
              >
                <div>
                  <label className='uploadFileLabel'>File Name</label>
                  <p><a onClick={() => downloadFile(prevDetails.fileName, prevDetails.originalFileName, prevDetails.typeOfFile)}>{prevDetails.fileName}</a></p>
                </div>
                <div>
                  <label className='uploadFileLabel'>Original File Name</label>
                  <p>{prevDetails.originalFileName}</p>
                </div>
                <div>
                  <label className='uploadFileLabel'>File Version</label>
                  <p>{prevDetails.fileVersion}</p>
                </div>
                <div>
                  <label className='uploadFileLabel'>File Path</label>
                  <p>{prevDetails.filePath}</p>
                </div>
                <div>
                  <label className='uploadFileLabel'>Type of File</label>
                  <p>{prevDetails.typeOfFile}</p>
                </div>
                <div>
                  <label className='uploadFileLabel'>Tags</label>
                  <p>{tags.length ? tags.toString() : '-'}</p>
                </div>
              </section>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default FileDetails;
