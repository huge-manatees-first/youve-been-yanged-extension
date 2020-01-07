
'use strict';

/**
 * Main file 
 */

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
  	if (document.readyState === "complete") {
  		clearInterval(readyStateCheckInterval);

			/**
			 * CSS selector for matching ads.
			 */

			var adSelectors = [
				'.ad',
				'.img_ad'
			]			

			/**
			 * Yang assets.
			 */
			
			var yangUrls = {
				banner: [
					'https://i.imgur.com/sawHigS.jpg',
					'https://i.imgur.com/keqEdP9.jpg',
					'https://i.imgur.com/K8Rni30.jpg'
				],
				square: [
					'https://i.imgur.com/FCG3hP3.jpg',
					'https://i.imgur.com/RZi9DYS.jpg',
					'https://i.imgur.com/8uqPXLW.jpg',
					'https://i.imgur.com/QRg5HsY.jpg'
				],
				tall: [
					'https://i.imgur.com/uvxobhk.jpg',
					'https://i.imgur.com/efGHMUe.jpg',
					'https://i.imgur.com/g1FHivB.jpg',
					'https://i.imgur.com/lYRjTQJ.jpg'
				]
			}

			/**
			 * Select random Yang ad.
			 */

			function getYangUrl(type) {
				var ads = yangUrls[type];
				return ads[Math.floor((Math.random() * ads.length))];
			}

			/**
			 * Get ad type.
			 */

			function getAdType(width, height) {
				if (height === 0) {
					return 'banner';
				}
				if (width === 0) return 'tall';
				if (width * 2 > height) {
					return 'banner';
				}
				else if (height * 2 > width) {
					return 'tall';
				}
				else {
					return 'square';
				}
			}

			/**
			 * Get all ad elements in array.
			 */

			function getAdElementsArray() {
				var adElementsArray = [];
				adSelectors.forEach(function(selector) {
					adElementsArray = adElementsArray.concat(adElementsArray, Array.from(document.querySelectorAll(selector)));
				});
				return adElementsArray;
			}

			/**
			 * Replace all media files.
			 */

			function replaceAllMediaFiles(array) {
				array.forEach(function(el) {
					replaceImage(el);
				});
			}
			
			/**
			 * Replace images.
			 */

			function replaceImage(el) {
				// Determine the size.
				var width = el.offsetWidth;
				var height = el.offsetHeight;

				// Grab the right dimension'd Yang image.
				var adType = getAdType(width, height);
				var imgUrl = getYangUrl(adType);

				// Replace.
				el.innerHTML = `<div style="background-position: center; background-size: contain; background-repeat: no-repeat; background-image: url(${imgUrl}); width: ${width}px; height: ${height}px;"></div>`;
				if (el.classList.contains('ad')) {
					el.classList.remove('ad');
				}
			}

			/**
			 * Do the thing.
			 */
			
			replaceAllMediaFiles(getAdElementsArray());

			/**
			 * Sometimes ads are updated.
			 */
			
			setInterval(function() {
				replaceAllMediaFiles(getAdElementsArray());
			}, 500)
		}
	}, 10);
});
