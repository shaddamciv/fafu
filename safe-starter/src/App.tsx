import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Divider, Text } from '@gnosis.pm/safe-react-components'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { Grid } from "@material-ui/core";
import { FileUpload } from "./components/FileUpload";
import { FileEditor } from "./components/FileEditor";
import { useReadLocalStorage } from 'usehooks-ts';
import { Web3Storage } from 'web3.storage';

const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDMwNjVlZmU1MDYxOTJiQWRiODczNDJDZDhGNUUwRDJiZkFjMzlCZWIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Njg5MDI5MTg3OTcsIm5hbWUiOiJoYWNrZmV2bSJ9.C0YvhqPTYH7V8TVzqoG5ctEHAQlCVcCoB4eSDyL6xzo" });

const Container = styled.div`
  margin-left: 16px;
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  flex: 2;
  justify-content: left;
  width: 100%;
`;


const Form = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const SafeApp = (): React.ReactElement => {
  const { sdk, safe } = useSafeAppsSDK()
  const [enabled, setEnabled ] = useState(false)
  const [enableTimeLock, setTimeLock ] = useState(true)
  const rootCID = useReadLocalStorage('CID')
  const [csvText, setCsvText] = useState<string>("for eg. Upload an airdrop CSV for permanent record keeping");
  const submitTx = useCallback(async () => {
    try {
      const { safeTxHash } = await sdk.txs.send({
        txs: [
          {
            to: "0x454824fde8ec3cfdd52fb463b0ceeda90316d770",
            value: '100000000001',
            data: '0x09598aca0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000a2b1b8000000000000000000000000000000000000000000000000000000000000004062616761366561347365617170697465336537626265683468627a6b7a777a77776877736f356f76636136777575626664647a743236727232686c7434736d71000000000000000000000000000000000000000000000000000000000000003b62616679626569637a32696b337766696f366b377972687965366278726770747337696771743675333261323266716a6e7072766f6e757633736d000000000000000000000000000000000000000000000000000000000000000000000000096630313339323839330000000000000000000000000000000000000000000000',
          },
        ],
      })
      console.log({ safeTxHash })
      const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash)
      console.log({ safeTx })
    } catch (e) {
      console.error(e)
    }
  }, [safe, sdk])

  const checkTx = useCallback(async () => {
    try {
      const rootCIDString = typeof rootCID === 'string'? rootCID: ''
      const status = await client.status(rootCIDString)
      console.log(status)
      if (status) {
        //TODO
      }
      } catch (e) {
      console.error(e)
    }
  }, [rootCID])
  const onChangeTextHandler = (csvText: string) => {
      setCsvText(csvText);
    };
  return (
    <Container>
      <Text size="lg">
        Steps
     </Text>
     <Text size="sm">
        1. Upload the file that you want to safe keep<br />
        2. Recieve a file upload confirmation with CID<br />
        3. Confirm to storage by paying a small fee in FIL 
     </Text>
     <Divider/>
     <Form>
  
      <Text size="lg">
        Upload, edit or paste your asset for filecoin storage <br /> 
        {/* <span style={{ fontFamily: "monospace" }}>{csvText}</span>) */}
      </Text>

      <FileEditor csvText={csvText} onChange={onChangeTextHandler} />
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={8}>
          <FileUpload onChange={onChangeTextHandler} />
        </Grid>
        <Grid item xs={12} md={8}>

        <Checkbox
          name="checkbox"
          checked={enabled}
          onChange={(_, checked) => setEnabled(checked)}
          label="Encrypt and Upload"
        />
        <Checkbox
          name="checkbox"
          checked={enableTimeLock}
          onChange={(_, checked) => setTimeLock(checked)}
          label="Enable Time Capsule of 10 Years"
        />
      </Grid>
      </Grid>
    </Form>
      {/* <Title size="md">Safe: {safe.safeAddress}</Title> */}
      <Divider/>

      <Button size="md" color="secondary" variant="bordered" iconType="resync" onClick={checkTx} >Check Status of the deal </Button>
      <Divider/>

       <Button size="lg" color="primary" onClick={submitTx}>
        Click to confirm the deal<br/>
        CID - {rootCID}
        </Button> 

      {/* <Link href="https://github.com/gnosis/safe-apps-sdk" target="_blank" rel="noreferrer">
        Documentation
      </Link> */}
    </Container>
  )
}

export default SafeApp
