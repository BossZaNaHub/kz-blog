deploy:
	scp -r ./kz/* root@178.128.49.82:/root/kuro-tiny-monitor/nginx/html
deploy-out:
	scp -r ./out/ root@178.128.49.82:/root/kuro-tiny-monitor/nginx/