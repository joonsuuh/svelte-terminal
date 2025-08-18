#!/bin/bash
# https://markoskon.com/creating-font-subsets/
pyftsubset\
    Inter-Regular.woff2 \
    --output-file="Inter-Regular-english.woff2" \
    --flavor=woff2 \
    --layout-features="kern,liga,clig,calt,ccmp,locl,mark,mkmk,\
    onum,pnum,smcp,c2sc,frac,lnum,tnum,subs,sups,\
    cswh,dlig,ss01,ss03,zero"\
    --unicodes="U+0000-00A0,U+00A2-00A9,U+00AC-00AE,U+00B0-00B7,\
    U+00B9-00BA,U+00BC-00BE,U+00D7,U+00F7,U+2000-206F,U+2074,U+20AC,\
    U+2122,U+2190-21BB,U+2212,U+2215,U+F8FF,U+FEFF,U+FFFD" &&

pyftsubset\
    Inter-Bold.woff2 \
    --output-file="Inter-Bold-english.woff2" \
    --flavor=woff2 \
    --layout-features="kern,liga,clig,calt,ccmp,locl,mark,mkmk,\
    onum,pnum,smcp,c2sc,frac,lnum,tnum,subs,sups,\
    cswh,dlig,ss01,ss03,zero"\
    --unicodes="U+0000-00A0,U+00A2-00A9,U+00AC-00AE,U+00B0-00B7,\
    U+00B9-00BA,U+00BC-00BE,U+00D7,U+00F7,U+2000-206F,U+2074,U+20AC,\
    U+2122,U+2190-21BB,U+2212,U+2215,U+F8FF,U+FEFF,U+FFFD" &&

pyftsubset\
    Inter-Italic.woff2 \
    --output-file="Inter-Italic-english.woff2" \
    --flavor=woff2 \
    --layout-features="kern,liga,clig,calt,ccmp,locl,mark,mkmk,\
    onum,pnum,smcp,c2sc,frac,lnum,tnum,subs,sups,\
    cswh,dlig,ss01,ss03,zero"\
    --unicodes="U+0000-00A0,U+00A2-00A9,U+00AC-00AE,U+00B0-00B7,\
    U+00B9-00BA,U+00BC-00BE,U+00D7,U+00F7,U+2000-206F,U+2074,U+20AC,\
    U+2122,U+2190-21BB,U+2212,U+2215,U+F8FF,U+FEFF,U+FFFD"   