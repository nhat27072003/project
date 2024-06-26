USE [master]
GO
/****** Object:  Database [beverage]    Script Date: 2/19/2024 3:56:28 PM ******/
CREATE DATABASE [beverage]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'beverage', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\beverage.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'beverage_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\beverage_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [beverage] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [beverage].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [beverage] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [beverage] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [beverage] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [beverage] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [beverage] SET ARITHABORT OFF 
GO
ALTER DATABASE [beverage] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [beverage] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [beverage] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [beverage] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [beverage] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [beverage] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [beverage] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [beverage] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [beverage] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [beverage] SET  ENABLE_BROKER 
GO
ALTER DATABASE [beverage] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [beverage] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [beverage] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [beverage] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [beverage] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [beverage] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [beverage] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [beverage] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [beverage] SET  MULTI_USER 
GO
ALTER DATABASE [beverage] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [beverage] SET DB_CHAINING OFF 
GO
ALTER DATABASE [beverage] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [beverage] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [beverage] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [beverage] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [beverage] SET QUERY_STORE = ON
GO
ALTER DATABASE [beverage] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [beverage]
GO
/****** Object:  User [project]    Script Date: 2/19/2024 3:56:28 PM ******/
CREATE USER [project] FOR LOGIN [project] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [nhat]    Script Date: 2/19/2024 3:56:28 PM ******/
CREATE USER [nhat] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [project]
GO
ALTER ROLE [db_owner] ADD MEMBER [nhat]
GO
/****** Object:  Schema [project]    Script Date: 2/19/2024 3:56:28 PM ******/
CREATE SCHEMA [project]
GO
/****** Object:  Table [dbo].[Cart]    Script Date: 2/19/2024 3:56:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cart](
	[cartID] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NULL,
	[created] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[cartID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CartProduct]    Script Date: 2/19/2024 3:56:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CartProduct](
	[cartProductID] [int] IDENTITY(1,1) NOT NULL,
	[cartID] [int] NULL,
	[productID] [int] NULL,
	[quantity] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[cartProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderProduct]    Script Date: 2/19/2024 3:56:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderProduct](
	[oderProductID] [int] IDENTITY(1,1) NOT NULL,
	[orderID] [int] NULL,
	[productID] [int] NULL,
	[quantity] [int] NULL,
	[priceProduct] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[oderProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 2/19/2024 3:56:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[orderID] [int] IDENTITY(1,1) NOT NULL,
	[userID] [int] NULL,
	[status] [bit] NULL,
	[sum] [int] NULL,
	[orderDate] [datetime] NULL,
	[address] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[orderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 2/19/2024 3:56:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[productID] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](30) NULL,
	[price] [int] NULL,
	[stock] [int] NULL,
	[category] [varchar](20) NULL,
	[imageUrl] [varchar](100) NULL,
	[available] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[productID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2/19/2024 3:56:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[userID] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](20) NOT NULL,
	[email] [varchar](50) NOT NULL,
	[password] [varchar](20) NULL,
	[name] [nvarchar](50) NULL,
	[address] [nvarchar](50) NULL,
	[phone] [varchar](10) NULL,
PRIMARY KEY CLUSTERED 
(
	[userID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Cart] ON 

INSERT [dbo].[Cart] ([cartID], [userID], [created]) VALUES (4, 1, 1)
INSERT [dbo].[Cart] ([cartID], [userID], [created]) VALUES (5, 2, 1)
INSERT [dbo].[Cart] ([cartID], [userID], [created]) VALUES (6, 3, 1)
SET IDENTITY_INSERT [dbo].[Cart] OFF
GO
SET IDENTITY_INSERT [dbo].[OrderProduct] ON 

INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (1, 1, 1, 2, 35)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (2, 1, 10, 2, 40)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (3, 1, 14, 2, 10)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (4, 2, 10, 2, 40)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (5, 2, 13, 6, 10)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (6, 3, 9, 1, 25)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (7, 3, 10, 1, 40)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (8, 3, 11, 1, 30)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (9, 3, 12, 1, 40)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (10, 4, 1, 1, 35)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (11, 4, 2, 1, 35)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (12, 4, 3, 1, 30)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (13, 4, 4, 1, 40)
INSERT [dbo].[OrderProduct] ([oderProductID], [orderID], [productID], [quantity], [priceProduct]) VALUES (14, 4, 5, 1, 30)
SET IDENTITY_INSERT [dbo].[OrderProduct] OFF
GO
SET IDENTITY_INSERT [dbo].[Orders] ON 

INSERT [dbo].[Orders] ([orderID], [userID], [status], [sum], [orderDate], [address]) VALUES (1, 2, 1, 170, CAST(N'2024-02-19T15:46:29.720' AS DateTime), N'hai bà trưng, hà nội')
INSERT [dbo].[Orders] ([orderID], [userID], [status], [sum], [orderDate], [address]) VALUES (2, 2, 0, 140, CAST(N'2024-02-19T15:47:03.347' AS DateTime), N'hoàng mai')
INSERT [dbo].[Orders] ([orderID], [userID], [status], [sum], [orderDate], [address]) VALUES (3, 3, 0, 135, CAST(N'2024-02-19T15:48:10.310' AS DateTime), N'hà nội')
INSERT [dbo].[Orders] ([orderID], [userID], [status], [sum], [orderDate], [address]) VALUES (4, 3, 0, 170, CAST(N'2024-02-19T15:48:43.723' AS DateTime), N'tp HỒ CHÍ MINH')
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON 

INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (1, N'Ô long sữa chân trâu ngũ cốc', 35, 2, N'tra-sua', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708331659/loo0tqmotsitnxy0jhxr.jpg', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (2, N'sữa tươi trân châu đường hổ', 35, 1, N'tra-sua', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708331692/qmjvrtdhqommywjr2os6.jpg', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (3, N'trà sữa phô mai tươi', 30, 3, N'tra-sua', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708331723/axqdex5tfzhj367u0aok.png', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (4, N'trà sữa chân trâu hoàng gia', 40, 2, N'tra-sua', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708331753/ifczmtabpfklagqxc2ok.jpg', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (5, N'trà sữa chân trâu sợi', 30, 1, N'tra-sua', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708331775/li1rlq63bcjpyksn7con.jpg', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (6, N'trà sữa ba anh em', 35, 4, N'tra-sua', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708331804/ssq6wlhyqvpk3fi8gdyi.jpg', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (7, N'trà sữa socola', 40, 1, N'tra-sua', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708331832/irh4pru0uoai9stwrwxh.jpg', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (8, N'trà sữa dâu tây', 30, 2, N'tra-sua', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708331930/det3hcrcxrvfa7ibtr79.jpg', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (9, N'cà phê đen đá', 25, 3, N'cafe', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708331962/nk52cugaeoceiwldgmm5.jpg', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (10, N'cà phê sữa đá', 40, 2, N'cafe', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708331982/g9pze3yzuxfttrjrafci.jpg', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (11, N'Jelly milk coffe', 30, 1, N'cafe', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708332011/dujk7xap18watek8oi8s.jpg', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (12, N'nước ngọt sprire hương chanh', 40, 1, N'nuoc-giai-khat', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708332221/ovucacwi17kkgbsjbyaq.webp', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (13, N'pepsi cola sleek lon', 10, 6, N'nuoc-giai-khat', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708332270/im7ifr1pxwca71he9e9k.webp', 1)
INSERT [dbo].[Product] ([productID], [name], [price], [stock], [category], [imageUrl], [available]) VALUES (14, N'nước tăng lục redbull', 10, 55, N'nuoc-giai-khat', N'https://res.cloudinary.com/dx0tsobsq/image/upload/v1708332316/hzyzgymokbhmw0twvpvm.webp', 1)
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([userID], [username], [email], [password], [name], [address], [phone]) VALUES (1, N'admin', N'admin@gmail.com', N'123', NULL, NULL, NULL)
INSERT [dbo].[Users] ([userID], [username], [email], [password], [name], [address], [phone]) VALUES (2, N'nhat', N'nhat@gmail.com', N'123', NULL, NULL, NULL)
INSERT [dbo].[Users] ([userID], [username], [email], [password], [name], [address], [phone]) VALUES (3, N'khach', N'khach@gmail.com', N'123', NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[Orders] ADD  DEFAULT (getdate()) FOR [orderDate]
GO
ALTER TABLE [dbo].[Product] ADD  DEFAULT ((1)) FOR [available]
GO
ALTER TABLE [dbo].[Cart]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[Users] ([userID])
GO
ALTER TABLE [dbo].[CartProduct]  WITH CHECK ADD FOREIGN KEY([cartID])
REFERENCES [dbo].[Cart] ([cartID])
GO
ALTER TABLE [dbo].[CartProduct]  WITH CHECK ADD FOREIGN KEY([productID])
REFERENCES [dbo].[Product] ([productID])
GO
ALTER TABLE [dbo].[OrderProduct]  WITH CHECK ADD FOREIGN KEY([orderID])
REFERENCES [dbo].[Orders] ([orderID])
GO
ALTER TABLE [dbo].[OrderProduct]  WITH CHECK ADD FOREIGN KEY([productID])
REFERENCES [dbo].[Product] ([productID])
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD FOREIGN KEY([userID])
REFERENCES [dbo].[Users] ([userID])
GO
USE [master]
GO
ALTER DATABASE [beverage] SET  READ_WRITE 
GO
