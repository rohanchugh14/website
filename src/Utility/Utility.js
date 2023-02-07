const CONSTANTS = {
    megabusAPI: "https://us.megabus.com/journey-planner/api",
    host: "http://localhost:3001",
}
const Routes = {
    journeys: CONSTANTS.megabusAPI + "/journeys",
    destinationCities: CONSTANTS.megabusAPI + "/destination-cities",
    proxy: CONSTANTS.host + "/proxy",
    travelDates: CONSTANTS.megabusAPI + "/journeys/travel-dates",
};

const defaultParameters = {
    "concessionCount": 0,
    "days": 1,
    "totalPassengers": 1,
    "nusCount": 0,
    "otherDisabilityCount": 0,
    "wheelchairSeated": 0,
    "pcaCount": 0,
}

const cities = {
    "Abbotsford, WI": 542,
    "Aiken, SC": 648,
    "Albany, NY": 89,
    "Albion, MI": 803,
    "Alfred, NY": 534,
    "Allentown, PA": 576,
    "Altavista, VA": 524,
    "Amherst, VA": 526,
    "Amsterdam, NY": 658,
    "Anderson, IN": 804,
    "Ann Arbor, MI": 91,
    "Appleton, WI": 555,
    "Arlington, VA": 485,
    "Athens, GA": 302,
    "Atlanta, GA": 289,
    "Augusta, GA": 647,
    "Austin, TX": 320,
    "Avon, NY": 701,
    "Baltimore, MD": 143,
    "Baraboo, WI": 552,
    "Batavia, NY": 654,
    "Bath, NY": 702,
    "Bath, PA": 613,
    "Baton Rouge, LA": 319,
    "Battle Creek, MI": 805,
    "Beaver Dam, WI": 559,
    "Beaver Meadows, PA": 595,
    "Bedford, IN": 806,
    "Berwick, PA": 612,
    "Bethesda, MD": 590,
    "Big Run, PA": 618,
    "Binghamton, NY": 93,
    "Birmingham, AL": 292,
    "Blacksburg, VA": 479,
    "Blairsville, PA": 615,
    "Bloomington, IN": 807,
    "Bloomington, NY": 663,
    "Bloomsburg, PA": 597,
    "Bonduel, WI": 545,
    "Boston, MA": 94,
    "Bradford, PA": 626,
    "Bristol, VA": 583,
    "Buffalo, NY": 95,
    "Burlington, VT": 96,
    "Camden, SC": 677,
    "Canton, NY": 668,
    "Catskill, NY": 665,
    "Champlain, NY": 743,
    "Charleston, SC": 737,
    "Charlotte, NC": 99,
    "Charlottesville, VA": 512,
    "Chestertown, NY - (Town Hall)": 682,
    "Chicago, IL": 100,
    "Chippewa Falls, WI": 540,
    "Christiansburg, VA": 101,
    "Clearfield, PA": 632,
    "Clifton Park, NY": 706,
    "Cobleskill, NY": 707,
    "College Station, TX": 531,
    "Columbia, SC": 454,
    "Columbus, OH": 105,
    "Columbus, WI": 566,
    "Conyers, GA": 640,
    "Corning, NY": 573,
    "Cortland, NY": 584,
    "Corydon, IN": 808,
    "Culpeper, VA": 527,
    "Dallas, PA": 638,
    "Dallas, TX": 317,
    "Dansville, NY": 709,
    "Danville, PA": 598,
    "Danville, VA": 521,
    "Dayton, OH": 370,
    "Daytona Beach, FL": 478,
    "Dekalb Junction, NY": 711,
    "Delmont, PA": 609,
    "Delphos, OH": 809,
    "Detroit, MI": 107,
    "DuBois, PA": 620,
    "Dulles Washington Airport (IAD), VA": 484,
    "Durham, NC": 131,
    "Dyersburg, TN": 810,
    "East Troy, WI": 498,
    "Easton, PA": 614,
    "Eau Claire, WI": 539,
    "Elkhart, IN": 367,
    "Ellicottville, NY": 629,
    "Elmira, NY": 572,
    "Evans Mills, NY": 713,
    "Evansville, IN": 811,
    "Farmville, VA": 523,
    "Fayetteville, NC": 455,
    "Florence, SC": 690,
    "Fond du Lac, WI": 557,
    "Fort Lauderdale / Hollywood, FL": 462,
    "Fort Wayne, IN": 812,
    "Frankfort, KY": 813,
    "Front Royal, VA": 483,
    "Fulton, KY": 814,
    "Gainesville, VA": 529,
    "Gary, IN": 369,
    "Geneseo, NY": 767,
    "Geneva, NY": 655,
    "Glens Falls, NY": 666,
    "Gouverneur, NY": 717,
    "Green Bay, WI": 546,
    "Greensboro, GA": 644,
    "Hamilton, NY": 536,
    "Hammond, IN": 815,
    "Harrisburg, PA": 111,
    "Harrisonburg, VA": 482,
    "Hartford, CT": 112,
    "Hazleton, PA": 596,
    "Hogansburg, NY (Akesasne Casino Rt. 37N)": 671,
    "Hornell, NY": 724,
    "Houston, TX": 318,
    "Hudsondale, PA": 594,
    "Hughesville, PA": 639,
    "Indiana, PA": 616,
    "Indianapolis, IN": 115,
    "Ithaca, NY": 511,
    "Jackson, MI": 816,
    "Jacksonville, FL": 295,
    "Janesville, WI": 489,
    "Jim Thorpe, PA": 593,
    "Johnson Creek, WI": 551,
    "Johnsonburg, PA": 622,
    "Kalamazoo, MI": 817,
    "Kane, PA": 624,
    "Keene Valley, NY": 679,
    "Keene, NY (Elm Tree Inn)": 678,
    "Kenton, OH": 362,
    "King of Prussia, PA": 577,
    "Kingston, NY": 664,
    "Kokomo, IN": 818,
    "La Crosse, WI": 554,
    "Lafayette, IN": 819,
    "Lake George, NY": 684,
    "Lake Placid, NY": 676,
    "Lantz Corners, PA": 625,
    "Lehighton, PA": 592,
    "Lewisburg, PA": 599,
    "Lexington, KY": 408,
    "Lexington, VA": 480,
    "Lima, OH": 363,
    "Little Rock, AR": 324,
    "Liverpool, PA": 606,
    "Lock Haven, PA": 635,
    "Longueuil, PQ": 768,
    "Louisville, KY": 298,
    "Ludlow, MA": 575,
    "Lumberton, NC": 691,
    "Lynchburg, VA": 525,
    "Madison, GA": 643,
    "Madison, WI": 119,
    "Malone, NY": 672,
    "Malta, NY": 730,
    "Manitowoc, WI": 538,
    "Marion, KY": 820,
    "Martinsville, IN": 821,
    "Martinsville, VA": 520,
    "Marysville, OH": 822,
    "Massena, NY": 670,
    "Mayfield, KY": 823,
    "Memphis, TN": 120,
    "Menomonie, WI": 586,
    "Merrillville, IN": 824,
    "Miami, FL": 450,
    "Milton, WI": 499,
    "Milwaukee, WI": 121,
    "Minneapolis, MN": 144,
    "Mobile, AL": 294,
    "Monroe, GA": 641,
    "Monroeville, PA": 608,
    "Montgomery, AL": 293,
    "Montpelier, VT": 463,
    "Montreal, PQ": 280,
    "Morganfield, KY": 825,
    "Morrisville, NY": 535,
    "Mt. Morris, NY": 733,
    "Muncie, IN": 372,
    "Muskego, WI": 497,
    "Myrtle Beach. SC": 693,
    "Nanuet, NY": 735,
    "Nashville, TN": 291,
    "New Bedford, MA": 456,
    "New Buffalo, PA": 607,
    "New Haven, CT": 122,
    "New Orleans, LA": 303,
    "New Paltz, NY": 660,
    "New York, NY": 123,
    "Newark, NJ": 610,
    "Newburgh, NY": 736,
    "Newton, MA": 308,
    "North Elba, NY": 740,
    "Norwich, NY": 574,
    "Olean, NY": 627,
    "Oneonta, NY": 685,
    "Orangeburg, SC": 649,
    "Orlando, FL": 297,
    "Orleans, IN": 837,
    "Oshkosh, WI": 556,
    "Owensboro, KY": 826,
    "Paducah, KY": 827,
    "Paoli, IN": 828,
    "Paul Smiths, NY (Campus Parking Area #10)": 673,
    "Pendleton, IN": 829,
    "Peru, IN": 830,
    "Philadelphia, NY": 769,
    "Philadelphia, PA": 127,
    "Philipsburg, PA": 631,
    "Pittsburgh, PA": 128,
    "Plattsburgh, NY": 667,
    "Plymouth Meeting, PA": 589,
    "Plymouth, IN": 375,
    "Port Trevorton, PA": 604,
    "Portage, WI": 568,
    "Portland, ME": 129,
    "Potsdam, NY": 669,
    "Pottersville, NY": 681,
    "Pottsville, PA": 633,
    "Prairie View, TX": 336,
    "Providence, RI": 130,
    "Pulsaki, NY": 759,
    "Punxsutawney, PA": 617,
    "Quakertown, PA": 591,
    "Queens Village, NY": 757,
    "Radford, VA": 581,
    "Raleigh, NC": 692,
    "Red Rock, PA": 637,
    "Richmond, IN": 371,
    "Richmond, VA": 132,
    "Ridgewood, NJ": 133,
    "Rochester, IN": 831,
    "Rochester, NY": 134,
    "Rosendale, NY": 662,
    "Salamanca, NY": 628,
    "Salem, VA": 580,
    "San Antonio, TX": 321,
    "San Marcos, TX": 533,
    "Saranac Lake, NY": 674,
    "Saratoga Springs, NY": 301,
    "Saugerties, NY": 755,
    "Schenectady, NY": 659,
    "Schroon Lake, NY": 680,
    "Scranton, PA": 578,
    "Selinsgrove, PA": 603,
    "Shamokin Dam, PA": 602,
    "Sheboygan, WI": 537,
    "Sonvea, NY": 745,
    "South Bend, IN": 368,
    "South Boston, VA": 522,
    "Sparta, WI": 553,
    "Spencer, IN": 832,
    "Springville, NY": 630,
    "St. Mary's, PA": 621,
    "St. Paul, MN": 430,
    "Stanley, WI": 541,
    "State College, PA": 137,
    "Staunton, VA": 481,
    "Stevens Point, WI": 560,
    "Stewart International Airport (SWF) - New York": 585,
    "Summerville, SC": 650,
    "Sumter, SC": 689,
    "Sunbury, PA": 601,
    "Sykesville, PA": 619,
    "Syracuse, NY": 139,
    "Terre Haute, IN": 833,
    "Thomson, GA": 645,
    "Tillson, NY": 661,
    "Toronto, ON": 145,
    "Union City, TN": 834,
    "Utica, NY": 656,
    "Van Wert, OH": 364,
    "Warrensburg, NY": 683,
    "Warrenton, VA": 528,
    "Warsaw, IN": 374,
    "Washington, DC": 142,
    "Washington, GA": 642,
    "Watertown, NY": 750,
    "Watsontown, PA": 611,
    "Waupun, WI": 558,
    "Wausau, WI": 543,
    "Westfield, WI": 567,
    "White Plains, NY": 748,
    "Whitewater, WI": 490,
    "Wilcox, PA": 623,
    "Wilkes-Barre, PA": 634,
    "Williamsport, PA": 600,
    "Wisconsin Dells, WI": 565,
    "Wittenberg, WI": 544,
    "Worcester, MA": 776,
    "Wytheville, VA": 582,
    "Ypsilanti, MI": 835
  }


export { CONSTANTS, Routes, defaultParameters, cities };