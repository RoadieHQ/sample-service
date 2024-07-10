date=$(date +"%Y-%m-%dT%H:%M:%S%z")
string_list_of_actions=$(ggrep --ignore-case --no-filename -Po 'uses:\s([\w\/\@\-\.]+)' .github/workflows/* | tr '\n' ',')

echo "$string_list_of_actions"

cat << EOF > ./payload.json
{ "items": [{ "timestamp": "$date", "entity": "component:default/sample-service", "facts": [{ "id": "6f108369-8e28-4dca-a98d-66e02e7d226a", "value": "$string_list_of_actions" } }] }] }
EOF
