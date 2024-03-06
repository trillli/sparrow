import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "./CodeSnippet";
import { PageLayout } from "./PageLayout";
import { getProtectedResource } from "./Message.service";
import TrillliPageBuilder from "./TrillliPageBuilder";
import ITrillliConfig from "../types/ITrillliConfig";

interface ProtectedProps {
  appConfig: ITrillliConfig
}

export const Protected: React.FC<ProtectedProps> = ({appConfig}) => {
  const [message, setMessage] = useState<string>('');

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getProtectedResource(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  console.log('message is: ')
  console.log(message)
  let deserializedMsg = message
  try {
    console.log(JSON.parse(message))
    deserializedMsg = JSON.parse(message)
  } catch {
    console.log('not ready')
  }
  

  return (
    <TrillliPageBuilder navSide navTop appConfig={appConfig} >
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Protected Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>protected message</strong> from an
              external API.
            </span>
            <span>
              <strong>Only authenticated users can access this page.</strong>
            </span>
          </p>
          {/* <CodeSnippet title="Protected Message" code={message} /> */}
          {/* <p>{message.othermsg}</p> */}
          <p>{message}</p>
        </div>
      </div>
    </TrillliPageBuilder>
  );
};

export default Protected
