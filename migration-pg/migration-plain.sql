--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-09-11 17:51:18

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 117519)
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    creator uuid NOT NULL,
    name character varying(40) NOT NULL,
    sortorder integer DEFAULT 0
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 117518)
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_id_seq OWNER TO postgres;

--
-- TOC entry 3334 (class 0 OID 0)
-- Dependencies: 210
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- TOC entry 209 (class 1259 OID 35400)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    uid uuid NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    nickname character varying(30) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 117532)
-- Name: usertags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usertags (
    id integer NOT NULL,
    creatorid uuid NOT NULL,
    tagid integer NOT NULL
);


ALTER TABLE public.usertags OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 117531)
-- Name: usertags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usertags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usertags_id_seq OWNER TO postgres;

--
-- TOC entry 3335 (class 0 OID 0)
-- Dependencies: 212
-- Name: usertags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usertags_id_seq OWNED BY public.usertags.id;


--
-- TOC entry 3173 (class 2604 OID 117522)
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- TOC entry 3175 (class 2604 OID 117535)
-- Name: usertags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertags ALTER COLUMN id SET DEFAULT nextval('public.usertags_id_seq'::regclass);


--
-- TOC entry 3326 (class 0 OID 117519)
-- Dependencies: 211
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3324 (class 0 OID 35400)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3328 (class 0 OID 117532)
-- Dependencies: 213
-- Data for Name: usertags; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3336 (class 0 OID 0)
-- Dependencies: 210
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 4, true);


--
-- TOC entry 3337 (class 0 OID 0)
-- Dependencies: 212
-- Name: usertags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usertags_id_seq', 4, true);


--
-- TOC entry 3179 (class 2606 OID 117525)
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- TOC entry 3177 (class 2606 OID 35404)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);


--
-- TOC entry 3181 (class 2606 OID 117537)
-- Name: usertags usertags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertags
    ADD CONSTRAINT usertags_pkey PRIMARY KEY (id);


--
-- TOC entry 3182 (class 2606 OID 117526)
-- Name: tags tags_creator_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_creator_fkey FOREIGN KEY (creator) REFERENCES public.users(uid) ON DELETE CASCADE;


--
-- TOC entry 3183 (class 2606 OID 117538)
-- Name: usertags usertags_creatorid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertags
    ADD CONSTRAINT usertags_creatorid_fkey FOREIGN KEY (creatorid) REFERENCES public.users(uid) ON DELETE CASCADE;


--
-- TOC entry 3184 (class 2606 OID 117543)
-- Name: usertags usertags_tagid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertags
    ADD CONSTRAINT usertags_tagid_fkey FOREIGN KEY (tagid) REFERENCES public.tags(id) ON DELETE CASCADE;


-- Completed on 2022-09-11 17:51:18

--
-- PostgreSQL database dump complete
--

