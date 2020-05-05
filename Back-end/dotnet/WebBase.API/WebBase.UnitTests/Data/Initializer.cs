using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using WebBase.Models;
using WebBase.Repositories;

namespace WebBase.UnitTests.Data
{
    public class Initializer
    {
        public void Initialize(Mock<DatabaseContext> mockContext)
        {
            CreateUser(mockContext);
        }

        private void CreateUser(Mock<DatabaseContext> mockContext)
        {
            var data = new List<User>()
            {
                new User()
                {
                    USERID = "1",
                    USERNAME = "Admin",
                    PASSWORD = "Admin",
                    ACTIVE = 1,
                    ROLE = "Admin",
                    ADDRESS = "HCM",
                    DAYOFBIRTH = new DateTime(1995, 1, 1),
                    CREATEDATE = new DateTime(2020, 1, 5),
                    UPDATEDATE = null,
                    DELETEDATE = null,
                    CUDID = "0"
                },
                new User()
                {
                    USERID = "2",
                    USERNAME = "User",
                    PASSWORD = "User",
                    ACTIVE = 1,
                    ROLE = "User",
                    ADDRESS = "HCM",
                    DAYOFBIRTH = new DateTime(1995, 1, 1),
                    CREATEDATE = new DateTime(2020, 1, 5),
                    UPDATEDATE = null,
                    DELETEDATE = null,
                    CUDID = "0"
                },
                new User()
                {
                    USERID = "1",
                    USERNAME = "Member",
                    PASSWORD = "Member",
                    ACTIVE = 1,
                    ROLE = "Member",
                    ADDRESS = "HCM",
                    DAYOFBIRTH = new DateTime(1995, 1, 1),
                    CREATEDATE = new DateTime(2020, 1, 5),
                    UPDATEDATE = null,
                    DELETEDATE = null,
                    CUDID = "0"
                },
                new User()
                {
                    USERID = "1",
                    USERNAME = "SuperAdmin",
                    PASSWORD = "SuperAdmin",
                    ACTIVE = 1,
                    ROLE = "SuperAdmin",
                    ADDRESS = "HCM",
                    DAYOFBIRTH = new DateTime(1995, 1, 1),
                    CREATEDATE = new DateTime(2020, 1, 5),
                    UPDATEDATE = null,
                    DELETEDATE = null,
                    CUDID = "0"
                }
            };

            var mockDbSet = GetQueryableMockDbSet.GetQueryableMockDbSets(data);
            mockDbSet.Setup(d => d.Remove(It.IsAny<User>())).Callback<User>((s) =>
            {
                var user = data.Find(x => x.USERID == s.USERID);
                data.Remove(user);
            });

            mockDbSet.Setup(d => d.Attach(It.IsAny<User>())).Callback<User>((s) =>
            {
                var itemUpdate = data.Find(x => x.USERID == s.USERID);
            });

            mockContext.Setup(x => x.User).Returns(mockDbSet.Object);
        }
    }
}
