## Http Requests Interface Docs

- signup

| Name | Must/Optional | Type | Parent Property | Comment | Input/Output |
| --- | --- | --- | --- | --- | --- |
| email | Must | string | param | signup email | Input |
| password | Must | string | param | signup password | Input |
| confirmPassword | Must | string | param | signup confirm password | Input |
| captcha | Must | string | param | signup captcha | Input |
| role | Must | string | param | signup role( 'visitor', 'authors', 'editors', 'administrators', 'owner' ) | Input |

- get_all_posts

| Name | Must/Optional | Type | Parent Property | Comment | Input/Output |
| --- | --- | --- | --- | --- | --- |
| limit | Must | number | param | posts per page | Input |
| page | Must | number | param | posts page | Input |
| filter | Must | object | param | posts filter | Input |
| status | Optional | string | filter | posts status ( 'all', 'draft', 'published', 'scheduled', 'featured' ) | Input |
| author | Optional | string | filter | posts author | Input |
| tag | Optional | string | filter | posts tag | Input |
| order | Optional | string | filter | posts list order ( 'desc', 'asc' ) | Input |
| tag | Optional | string | filter | posts tags | Input |
| posts | Must | list | data | all posts list | Output |
| id | Must | string | posts | post id | Output |
| title | Must | string | posts | post title | Output |
| mobiledoc | Must | string | posts | posts content mobiledoc format | Output |
| html | Must | string | posts | posts content html format | Output |
| plaintext | Must | string | posts | posts content plain text format | Output |
| featureImage | Optional | string | posts | posts feature image | Output |
| status | Must | string | posts | posts status ( 'draft', 'published', 'scheduled', 'featured' ) | Output |
| visibility | Must | string | posts | posts visibility ('public', 'private') | Output |
| meta_title | Optional | string | posts | posts meta title(Used for search engine purpose) | Output |
| meta_description | Optional | string | posts | posts meta description(Used for search engine purpose) | Output |
| author_id | Must | string | posts | author id of this post | Output |
| created_at | Must | number | posts | post create time | Output |
| created_by | Must | string | posts | post create person | Output |
| updated_at | Optional | number | posts | post update time | Output |
| published_at | Optional | number | posts | post publish time | Output |
| published_by | Optional | string | posts | post publish person | Output |
| custom_excerpt | Optional | string | posts | post custom excerpt | Output |
| featured | Must | string | posts | post favorite status('0': normal, '1': featured ) | Output |
| tags | Must | array | posts | post tags( eg: ['fontend', 'backend'] ) | Output |
| twitter_image | Optional | string | posts | image showed when shared to twitter | Output |
| twitter_title | Optional | string | posts | title showed when shared to twitter | 
Output |
| twitter_description | Optional | string | posts | description showed when shared to twitter | Output |
| fb_image | Optional | string | posts | image showed when shared to fackbook | Output |
| fb_title | Optional | string | posts | title showed when shared to fackbook | Output |
| fb_description | Optional | string | posts | description showed when shared to fackbook | Output |