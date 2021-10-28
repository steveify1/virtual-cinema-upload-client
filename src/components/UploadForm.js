import { useEffect, useState } from "react";
import axios from 'axios';

export const UploadForm = () => {
    const [files, setFiles] = useState(null);
    const [initiatedUploadResponse, setInitiatedUploadResponse] = useState({
        "uploadUrl": "https://virtual-cinema.s3.amazonaws.com/PQmQhZyhJJDXA4FKlVkHSfQ2c.png?AWSAccessKeyId=AKIASWSNZA7ULFJ5W63P&Content-Type=image%2Fpng&Expires=1634378114&Signature=EGRj5gE3Yxgg97%2BcdrSqB5C7RZU%3D",
    "fileName": "PQmQhZyhJJDXA4FKlVkHSfQ2c.png"
    });
    
    const handleChange = async ({ target }) => {
        try {
            setFiles(target.files);
            console.log(target.files)
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async () => {
        if (!files || !files.length) {
            return;
        }

        const file = files[0];
        console.log(file);

        try {
            // const s3Response = await axios.put(initiatedUploadResponse.uploadUrl, file, {
            //     headers: {
            //         "Content-Type": "multipart/form-data",
            //     }
            // });

            fetch(initiatedUploadResponse.uploadUrl, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(async (response) => {
                console.log(await response.text());
            }).catch((e) => {
                console.log('Error Response', e)
            })

            // console.log(s3Response);
        } catch (error) {
            console.log(error);
        }
    }

    return (<div>
        <input
            type='file'
            multiple={true}
            onChange={handleChange}
        />

        <button onClick={handleSubmit}>Submit</button>
    </div>);
}