---

layout: post
title: IP Geolocation:ئامرازێکی سەرچاوەکراوە بۆ پەیداکردنی ئای‌پی بەکارهێنەر
tags: [سەرچاوەکراوە]
date : "2020-10-17 12:56:14"
---
[IP Geolocation API](https://ipgeolocationapi.com/) : ئەتوانین بڵێین کە ئای‌پی ـێکی خۆڕاییە لە ژێر مۆڵەتدانی MIT کە بە شێوازی سەرچاوەکراوە بڵاو بووە.
.بە یارمەتی ئای‌پی بەکارهێنەر زۆر بە ئاسانی دەتوانرێت شوێنی پەیوەندی بەکارهێنەر بە ئینتێرنێت پەیدا بکرێت.

چوارچێوەی گشتی دراوەکەی گەڕاوە بۆ خزمەتگوزاری بەم شێوەیە

```HTML
GET https://api.ipgeolocationapi.com/geolocate/IP_ADDRESS HTTP/1.1
```
بە یارمەتی خشتەکان لە زمانی بەرنامە داڕشتنی جیاواز و جێبەجێکردنی IP_ADDRESS، بە سادەیی دەتوانین داوایێک  لە شێوەی get بنێرین و  داوایەک بە شێوازی جە‌یسۆن وەربگرین.

ئەم خزمەتگوزارییە لە IPv4 و IPv6  پاڵپشتی دەکا،بۆ نموونە  پەڕگەی جەی‌سۆنی ئەم ئای‌پییە بەم جۆرەیە
```json
{
    "continent": "Europe",
    "address_format": "{{recipient}}\n{{street}}\n{{postalcode}} {{city}}\n{{country}}",
    "alpha2": "DE",
    "alpha3": "DEU",
    "country_code": "49",
    "international_prefix": "00",
    "ioc": "GER",
    "gec": "GM",
    "name": "Germany",
    "national_destination_code_lengths": [
        2,
        3,
        4,
        5
    ],
    "national_number_lengths": [
        6,
        7,
        8,
        9,
        10,
        11
    ],
    "national_prefix": "0",
    "number": "276",
    "region": "Europe",
    "subregion": "Western Europe",
    "world_region": "EMEA",
    "un_locode": "DE",
    "nationality": "German",
    "eu_member": true,
    "eea_member": true,
    "vat_rates": {
        "standard": 19,
        "reduced": [
            7
        ],
        "super_reduced": null,
        "parking": null
    },
    "postal_code": true,
    "unofficial_names": [
        "Germany",
        "Deutschland",
        "Allemagne",
        "Alemania",
        "ドイツ",
        "Duitsland"
    ],
    "languages_official": [
        "de"
    ],
    "languages_spoken": [
        "de"
    ],
    "geo": {
        "latitude": 51.165691,
        "latitude_dec": "51.20246505737305",
        "longitude": 10.451526,
        "longitude_dec": "10.382203102111816",
        "max_latitude": 55.0815,
        "max_longitude": 15.0418962,
        "min_latitude": 47.2701115,
        "min_longitude": 5.8663425,
        "bounds": {
            "northeast": {
                "lat": 55.0815,
                "lng": 15.0418962
            },
            "southwest": {
                "lat": 47.2701115,
                "lng": 5.8663425
            }
        }
    },
    "currency_code": "EUR",
    "start_of_week": "monday"
}
```