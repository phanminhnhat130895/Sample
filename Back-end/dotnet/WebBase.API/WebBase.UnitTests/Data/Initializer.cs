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
                    userid = "1",
                    username = "Admin",
                    password = "Admin",
                    status = 1,
                    role = "Admin",
                    address = "HCM",
                    dayofbirth = new DateTime(1995, 1, 1),
                    createdate = new DateTime(2020, 1, 5),
                    updatedate = null,
                    deletedate = null,
                    cudid = "0"
                },
                new User()
                {
                    userid = "2",
                    username = "User",
                    password = "User",
                    status = 1,
                    role = "User",
                    address = "HCM",
                    dayofbirth = new DateTime(1995, 1, 1),
                    createdate = new DateTime(2020, 1, 5),
                    updatedate = null,
                    deletedate = null,
                    cudid = "0"
                },
                new User()
                {
                    userid = "1",
                    username = "Member",
                    password = "Member",
                    status = 1,
                    role = "Member",
                    address = "HCM",
                    dayofbirth = new DateTime(1995, 1, 1),
                    createdate = new DateTime(2020, 1, 5),
                    updatedate = null,
                    deletedate = null,
                    cudid = "0"
                },
                new User()
                {
                    userid = "1",
                    username = "SuperAdmin",
                    password = "SuperAdmin",
                    status = 1,
                    role = "SuperAdmin",
                    address = "HCM",
                    dayofbirth = new DateTime(1995, 1, 1),
                    createdate = new DateTime(2020, 1, 5),
                    updatedate = null,
                    deletedate = null,
                    cudid = "0"
                }
            };

            var mockDbSet = GetQueryableMockDbSet.GetQueryableMockDbSets(data);
            mockDbSet.Setup(d => d.Remove(It.IsAny<User>())).Callback<User>((s) =>
            {
                var user = data.Find(x => x.userid == s.userid);
                data.Remove(user);
            });

            mockDbSet.Setup(d => d.Attach(It.IsAny<User>())).Callback<User>((s) =>
            {
                var itemUpdate = data.Find(x => x.userid == s.userid);
            });

            mockContext.Setup(x => x.User).Returns(mockDbSet.Object);
        }
    }
}
