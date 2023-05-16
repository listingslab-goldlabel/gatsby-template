import React from "react"
import "../theme/default.css"
import { GatsbySeo } from "gatsby-plugin-next-seo"
import {
  WrapperShape,
} from "../types"
import {
  makeImgSrc,
  useGQLMeta,
  Font,
  Icon,
  Sitemap,
  MuiTheme,
  WrapRedux,
} from "../"
import {
  Avatar,
  IconButton,
  Box,
  Button,
  Card,
  CardHeader,
  CardActions,
  Container,
  CardMedia,
  Grid,
} from "@mui/material"

export default function PwaSeo(props: WrapperShape) {
  let locale: string = "en"
  let title: string = ""
  let seotitle: string = ""
  let description: string = ""
  let keywords: string = ""
  let url: string = ""
  let og: string = ""
  let avatar: string = ""
  let twitter: string = "@"

  seotitle
  const {
    pageContext,
  } = props
  
  const meta = useGQLMeta()
  const {
    siteUrl,
    siteTitle,
    siteDescription,
    siteKeywords,
    siteIcon,
    siteTwitter,
  } = meta
  twitter = siteTwitter
  title = siteTitle
  description = siteDescription
  keywords = siteKeywords
  avatar = siteIcon  
  const {special, instructions, book, path} = pageContext.data
  url = `${siteUrl}${path}`
  let appData: any = null
  if(pageContext){
    const {data} = pageContext    
    appData = data
  }



  if(special === "404"){
    title = instructions
    seotitle =  `${instructions} ${siteTitle.title}`
  }

  if(special === "book"){
    if (book){
      locale = book.locale
      title = book.title
      seotitle =  `${book.title} ${siteDescription}`
      description = book.description
      keywords = book.keywords
      const {bookimage} = book
      if (bookimage){
        og = makeImgSrc(bookimage.url)
      }
    }
  }

  if(special === "home"){
    seotitle =  `${siteTitle} ${siteDescription}`
    description = siteDescription
    keywords = siteKeywords
  }


  const showActions = true
  const showLabels = true


  return (<>
            <GatsbySeo 
              title={seotitle}
              description={description}
              canonical={siteUrl}
              openGraph={{
                type: 'website',
                url,
                title,
                description,
                images: [
                  {
                    url: og,
                  },
                ],
              }}
              twitter={{
                handle: twitter,
                site: twitter,
                cardType: 'summary_large_image',
              }}
            />
            <WrapRedux>
              <MuiTheme>
                <Container maxWidth="md" sx={{my:1}}>
                  
                  <Grid container>
                    <Grid item xs={12}>
                      <Card>
                        <CardHeader 
                          avatar={<IconButton
                                    onClick={(e: React.MouseEvent) => {
                                      e.preventDefault()
                                      window.open(`/`, "_self")
                                  }}>
                                    <Avatar src={avatar} alt={description}/>
                                  </IconButton>}
                          title={<Font variant="title">
                                  {title}
                                </Font>}
                          subheader={<Font variant="subheader">
                                      {description}
                                    </Font>}
                          action={<>
                          <IconButton
                              onClick={(e: React.MouseEvent) => {
                                  e.preventDefault()
                                  window.open(`https://github.com/listingslab-goldlabel/gatsby-template`, "_blank")
                              }}>
                              <Icon icon="github" />
                          </IconButton>
                          
                          </>}
                        />
                        { og ? <CardMedia 
                                component={"img"}
                                src={og} 
                                height={200}
                                alt={`${title} ${description}`}
                              /> : null }    
                        
                        {showActions ? <CardActions>
                            <Box sx={{flexGrow:1}}/>
                                <Button
                                  color="primary"
                                  variant="text">
                                    <Icon icon="left" />
                                    {showLabels ? <Font style={{marginLeft: 8, marginRight: 8}}>
                                      Back
                                    </Font>  : null }
                                </Button>

                                <Button
                                  color="primary"
                                  variant="text">
                                    <Icon icon="up" />
                                    {showLabels ? <Font style={{marginLeft: 8, marginRight: 8}}>
                                      Up
                                    </Font>  : null }
                                </Button>
                                
                                <Button
                                  color="primary"
                                  variant="text">
                                    {showLabels ? <Font style={{marginLeft: 8, marginRight: 8}}>
                                      Next
                                    </Font>  : null }
                                    <Icon icon="right" />
                                </Button>
                                <Box sx={{flexGrow:1}}/>
                              </CardActions> : null }
                          <Sitemap />
                        </Card>                  
                    </Grid>
                  </Grid>
                </Container>
              </MuiTheme>
            </WrapRedux>
          </>)
}

export function Head() {
  const locale = "en"
  return (
    <>
      <html lang={locale} />
    </>
  )
}

/*
<Avatar 
  sx={{width: 16, height: 16}}
  alt={`${title} ${description}`}
  src={`/svg/localeflags/${locale}.svg`}
/>
*/