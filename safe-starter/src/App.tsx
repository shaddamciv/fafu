import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, Checkbox, Divider, Text } from '@gnosis.pm/safe-react-components'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { Grid } from "@material-ui/core";
import { FileUpload } from "./components/FileUpload";
import { FileEditor } from "./components/FileEditor";
import { useReadLocalStorage } from 'usehooks-ts'

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
            to: safe.safeAddress,
            value: '0',
            data: '0x',
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
