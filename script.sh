date=$(date +"%Y-%m-%dT%H:%M:%S%z")
cat << EOF > ./payload.json
{"commit_id": "$date" }
EOF
