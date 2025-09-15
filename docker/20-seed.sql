SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

INSERT INTO public.products VALUES ('9cd3d811-ff3c-41d2-abed-b1cae4866aef', 'Nike Air Force 1', 799.99, 759.99, 999, 'nike-air-force-1', '2025-08-22 14:37:19.864');
INSERT INTO public.products VALUES ('7f494719-a8a9-48fe-aafe-b52c3f43974e', 'Nike Air Jordan 1', 1599.99, 1399.99, 2, 'nike-air-jordan-1', '2025-08-22 14:50:35.355');
INSERT INTO public.products VALUES ('0f59b86f-309d-4a15-8300-e672b4ab249a', 'Nike Mercurial', 399.99, 299.99, 0, 'nike-mercurial', '2025-08-22 14:53:15.889');
INSERT INTO public.products VALUES ('85e5a0cb-495c-4985-9fa2-5aa1f97e120a', 'Nike Run', 499.99, 459.99, 0, 'nike-run', '2025-08-22 14:55:32.567');

INSERT INTO public.product_images VALUES ('7c53f333-68bc-46a3-a37a-03aa71b6d409', '9cd3d811-ff3c-41d2-abed-b1cae4866aef', 'https://res.cloudinary.com/dvfhhlc5a/image/upload/v1755873440/zyra/products/szoxoappcku3mc8syj0i.avif', '2025-08-22 14:37:21.337');
INSERT INTO public.product_images VALUES ('aaef2e4b-e420-4106-9fd5-bd6200a5f5dc', '7f494719-a8a9-48fe-aafe-b52c3f43974e', 'https://res.cloudinary.com/dvfhhlc5a/image/upload/v1755874236/zyra/products/qy8t4l2fjmyzxh55adld.avif', '2025-08-22 14:50:36.601');
INSERT INTO public.product_images VALUES ('a3d9c4f1-0d6a-4004-965d-347d47f83639', '0f59b86f-309d-4a15-8300-e672b4ab249a', 'https://res.cloudinary.com/dvfhhlc5a/image/upload/v1755874396/zyra/products/xkaxatmbpvpkgiu1aadj.jpg', '2025-08-22 14:53:17.538');
INSERT INTO public.product_images VALUES ('35a7c12b-0989-46a0-8917-3e3f2ff0f81d', '85e5a0cb-495c-4985-9fa2-5aa1f97e120a', 'https://res.cloudinary.com/dvfhhlc5a/image/upload/v1755874533/zyra/products/et1exdbjasx1g1ggwkxm.avif', '2025-08-22 14:55:34.039');
